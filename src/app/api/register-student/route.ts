import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Adjust the import path
import { ObjectId } from 'mongodb';
import { uploadToS3 } from '@/lib/UploadTos3'; // Adjust the import path
import { parseFormData } from '@/lib/helper';

// Utility to handle parsing FormData in Next.js API route


export const POST = async (req: Request) => {
  try {
    // Parse form data from the request
    const { fields, file } = await parseFormData(req);

    // Destructure form fields
    const { madrasaId, studentName, FatherName, age, grade, TshirtSize, activity } = fields;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded.' },
        { status: 400 }
      );
    }

    // Upload to S3
    const uploadResult = await uploadToS3(file);

    // Database operations
    const client = await clientPromise;
    const db = client.db('school');
    const madrasa = await db.collection('madrasas').findOne({ _id: new ObjectId(madrasaId) });

    if (!madrasa) {
      return NextResponse.json(
        { success: false, error: 'Madrasa not found.' },
        { status: 404 }
      );
    }

    const result = await db.collection('students').insertOne({
      madrasaId,
      studentName,
      FatherName,
      age: Number(age),
      grade,
      TshirtSize,
      status: 'Pending',
      activity,
      fileUrl: uploadResult.Location, // Save the file URL from S3
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Student added successfully', data: result },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
