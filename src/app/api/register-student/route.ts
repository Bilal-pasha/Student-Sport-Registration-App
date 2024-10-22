
import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { madrasaId, studentName,FatherName, age, grade, TshirtSize, activity } = body;

        // Validate input
      // if (!madrasaId || !studentName || !age || !grade) {
      //   return NextResponse.json(
      //     { success: false, error: 'All fields are required.' },
      //     { status: 400 }
      //   );
      // }

        const client = await clientPromise;
        const db = client.db('school');

        // Check if the madrasa exists
        const madrasa = await db.collection('madrasas').findOne({ _id: new ObjectId(madrasaId) });
        if (!madrasa) {
        return NextResponse.json(
            { success: false, error: 'Madrasa not found.' },
            { status: 404 }
        );
        }

        // Insert the student into the students collection
        const result = await db.collection('students').insertOne({
          madrasaId,
          studentName,
          FatherName,
          age,
          grade,
          TshirtSize,
          activity,
          createdAt: new Date(),
        });

      return NextResponse.json(
          { success: true, message: 'Student added successfully', data: result },
          { status: 201 }
      );

      } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
}
