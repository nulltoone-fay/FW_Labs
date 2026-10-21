import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Project from '@/models/Project';

type RouteParams = { params: Promise<{ id: string }> };

// PUT: Update an existing project
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectMongo();
    
    const id = (await params).id; // Unwrap the promise (Next.js 15 requirement)
    const body = await request.json();
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      body,
      { returnDocument: 'after', runValidators: true } 
    ).lean(); // .lean() for faster response processing

    if (!updatedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error) {
    console.error('Database Update Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE: Remove a project from the database
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectMongo();
    
    const id = (await params).id;
    const deletedProject = await Project.findByIdAndDelete(id).lean();

    if (!deletedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error('Database Delete Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}