import { NextResponse } from "next/server";
import clientPromise from '../../lib/mongodb';

export async function POST(request: any) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('school');
    const result = await db.collection('students').insertOne({body});
    return NextResponse.json({ success: true, message: 'Student added successfully', data: result, result: body});
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}   

export async function GET(request: any) {
    try {
      // Process your data here
      const client = await clientPromise;
      const db = client.db('school');
      const students = await db.collection('students').find({}).toArray();
      const modifiedStudents = students.map((student) => {
        return {
          ...student.body,  // Spread the body properties
          id: student._id,  // Add the `_id` field to the body as `id`
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