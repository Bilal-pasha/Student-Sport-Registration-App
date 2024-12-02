import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { parseFormData } from "@/lib/helper";
import { uploadToS3 } from "@/lib/UploadTos3"; // Adjust the import path

// use this as a mock data replace it later with actual data

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("school");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const student = await db
      .collection("students")
      .findOne({ _id: new ObjectId(id) });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Define the monthly fees status with all months set to "Not Paid"

    // Add the fees status object to the student object

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("school");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(id as string) });
    if (result.deletedCount === 1) {
      return NextResponse.json({
        message: "Student deleted successfully",
        delete: true,
      });
    } else {
      return NextResponse.json({ message: "Student not found", delete: false });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse form data from the request
    const { fields, file } = await parseFormData(req as any);
    const { name, fatherName, GRNumber, fees, feesStatus, status } = fields;

    // Convert feesStatus from string to array
    const feesStatusChart = JSON.parse(feesStatus);

    // Upload the file to S3 if it exists
    const uploadResult = file ? await uploadToS3(file) : null;

    // Prepare the student data for insertion
    const studentData = {
      name,
      fatherName,
      GRNumber,
      fees,
      feesStatus: feesStatusChart, // Ensure proper naming consistency
      status,
      ...(uploadResult && { fileUrl: uploadResult.Location }), // Conditionally add fileUrl
    };

    // Connect to MongoDB and insert the student data
    const client = await clientPromise;
    const db = client.db("school");

    // Insert the new student document
    const result = await db.collection("students").insertOne(studentData);

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Student added successfully",
      data: result,
      result: studentData,
    });
  } catch (error: any) {
    console.error("Error adding student:", error);
    // Handle errors and return a failure response
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
