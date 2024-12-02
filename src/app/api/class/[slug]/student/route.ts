import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { parseFormData } from '@/lib/helper';
import { uploadToS3 } from '@/lib/UploadTos3'; // Adjust the import path

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    // Parse the form data from the request
    const { fields, file } = await parseFormData(req);

    // Destructure only the fields provided by the frontend
    const { name, fatherName, GRNumber, fees, feesStatus, status } = fields;
    const feesStatusChart = JSON.parse(feesStatus); // Convert string back to array

    // If there's a file, upload it to S3 and get the upload result
    const uploadResult = file ? await uploadToS3(file as any) : null;

    // Get the classSlug from the route parameters
    const classSlug = params.slug;

    // Prepare the student data object to insert into the database
    const studentData = {
      name,
      fatherName,
      GRNumber,
      fees,
      feesStatusChart,
      status,
      classSlug, // Include classSlug from the route
      ...(uploadResult && { fileUrl: uploadResult.Location }), // Conditionally add fileUrl
    };

    // Connect to the MongoDB client and select the database
    const client = await clientPromise;
    const db = client.db("school");

    // Insert the student into the `students` collection
    const result = await db.collection("students").insertOne(studentData);

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Student added successfully",
      data: result,
      result: studentData,
    });
  } catch (error: any) {
    // Handle errors and return a 400 response with the error message
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