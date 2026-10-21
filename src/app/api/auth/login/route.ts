import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectMongo();
    const { username, password } = await request.json();

    // Find the admin in the database
    const admin = await Admin.findOne({ username });

    // Securely compare the provided password against the hashed password in the database
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const cookieStore = await cookies();
      
      cookieStore.set('fw_admin_session', process.env.ADMIN_TOKEN!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}