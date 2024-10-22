import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function POST(request: any, { params }: { params: { slug: string } }) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    
    // Get the classSlug from params (dynamic route)
    const classSlug = params.slug;

    // Add the classSlug to the student's data
    const studentData = {
      ...body,       // Spread the parsed student data
      classSlug,     // Include the classSlug
    };

    const client = await clientPromise;
    const db = client.db('school');
    
    // Insert the student with classSlug into the database
    const result = await db.collection('students').insertOne(studentData);

    return NextResponse.json({
      success: true,
      message: 'Student added successfully',
      data: result,
      result: studentData
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: any, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('school');
    
    // Get the class slug from the request params
    const classSlug = params.slug;
    
    // Fetch students only for the specific class using the slug
    const students = await db.collection('students').find({ classSlug }).toArray();
    
    const modifiedStudents = students.map((student) => {
      return {
        ...student,  // Spread the student properties
        id: student._id,  // Include the `_id` field as `id`
      };
    });
    
    return new Response(JSON.stringify(modifiedStudents), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}