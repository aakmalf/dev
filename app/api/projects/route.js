import { NextResponse } from "next/server";
import connectDB from "../../utils/db";
import Project from "../../models/projects";

export async function GET() {
  await connectDB();
  try {
    const projects = await Project.find({});
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const project = new Project(body);
    await project.save();
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
