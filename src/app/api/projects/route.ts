import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Project from '@/models/Project';

// GET: Fetch all projects for the live frontend
export async function GET() {
  try {
    await connectMongo();
    
    // Fetch all projects, sorted by buildId. 
    // .lean() strips heavy Mongoose methods for maximum performance.
    const projects = await Project.find({}).sort({ buildId: 1 }).lean();
    
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    console.error('Database Read Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Create a new project record
export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.link) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields (title, description, link)' 
      }, { status: 400 });
    }

    const newProject = await Project.create(body);
    
    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error('Database Write Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}