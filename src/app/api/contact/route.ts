import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectMongo from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// IP Rate Limiting Store
const rateLimit = new Map<string, { count: number; startTime: number }>();

// Simple sanitization helper to neutralize HTML injection
function sanitizeText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(120),
  projectType: z.string().trim().max(100).optional().default('Web Application'),
  budget: z.string().trim().max(60).optional().default('Not Specified'),
  message: z.string().trim().min(8, 'Message must be at least 8 characters').max(4000),
  // Honeypot field for bot spam trap
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export async function POST(request: Request) {
  try {
    // 1. IP Extraction & Rate Limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown-client';
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 Hour window
    const maxRequests = 5; // Max 5 submissions per hour per IP

    if (rateLimit.has(ip)) {
      const userData = rateLimit.get(ip)!;
      if (now - userData.startTime < windowMs) {
        if (userData.count >= maxRequests) {
          return NextResponse.json(
            { success: false, error: 'Rate limit exceeded. Please wait a bit or email us directly.' },
            { status: 429 }
          );
        }
        userData.count++;
      } else {
        rateLimit.set(ip, { count: 1, startTime: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, startTime: now });
    }

    // 2. Parse & Validate Request Body
    const rawBody = await request.json();
    const parseResult = ContactFormSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(errors).flat()[0] || 'Invalid form data submitted.';
      return NextResponse.json(
        { success: false, error: firstErrorMessage },
        { status: 400 }
      );
    }

    const { name, email, projectType, budget, message, honeypot } = parseResult.data;

    // 3. Honeypot check: If bot filled the hidden honeypot field, silently succeed without writing to DB
    if (honeypot && honeypot.length > 0) {
      console.warn(`[Security Alert] Bot trapped via honeypot from IP: ${ip}`);
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 4. Sanitize inputs
    const sanitizedName = sanitizeText(name);
    const sanitizedEmail = sanitizeText(email);
    const sanitizedProjectType = sanitizeText(projectType);
    const sanitizedBudget = sanitizeText(budget);
    const sanitizedMessage = sanitizeText(message);

    // 5. Connect and save to Database
    let savedInquiry = null;
    try {
      await connectMongo();
      savedInquiry = await Inquiry.create({
        name: sanitizedName,
        email: sanitizedEmail,
        projectType: sanitizedProjectType,
        budget: sanitizedBudget,
        message: sanitizedMessage,
      });
    } catch (dbError) {
      console.error('Database connection / save error:', dbError);
      // Fallback: Proceed even if DB has issues so notification can still fire if configured
    }

    // 6. Send notification email via Resend if configured
    if (resend && resendApiKey) {
      try {
        await resend.emails.send({
          from: 'FW Labs <onboarding@resend.dev>',
          to: sanitizedEmail,
          subject: 'Project Inquiry Confirmed // FW Labs',
          html: `
            <div style="font-family: monospace; padding: 24px; background: #09090b; color: #f4f4f5;">
              <h2 style="color: #4ade80; margin-bottom: 16px;">FW LABS // INQUIRY CONFIRMATION</h2>
              <p>Hi ${sanitizedName},</p>
              <p>We received your inquiry regarding <strong>${sanitizedProjectType}</strong> (${sanitizedBudget}).</p>
              <p>Our team is currently reviewing your project details and will be in touch within 24 hours.</p>
              <br/>
              <p style="color: #71717a; font-size: 12px;">FW Labs Studio — Independent Engineering</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.warn('Resend email notice skipped or failed:', emailError);
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Project inquiry successfully transmitted.',
        data: savedInquiry ? { id: savedInquiry._id } : undefined 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal system error processing request. Please email directly.' },
      { status: 500 }
    );
  }
}