import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, madrasaId, studentName, FatherName, age, grade, TshirtSize, activity, status, group, camp, subCamp, report } = body;

        // Validate input
        if (!studentId || !madrasaId || !studentName || !age || !grade) {
            return NextResponse.json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

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

        // Check the number of students in the subCamp across all madrasas
        const subCampCount = await db.collection('students').countDocuments({ camp });
        if (subCampCount >= 8) {
            return NextResponse.json(
                { success: false, error: 'This Camp is Full Please use Another Camp Number' },
                { status: 400 }
            );
        }

        // Update the student in the students collection
        const result = await db.collection('students').updateOne(
            { _id: new ObjectId(studentId) }, // Filter by studentId
            { $set: { studentName, FatherName, age, grade, TshirtSize, activity, status, group, camp, subCamp, report, updatedAt: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { success: false, error: 'No student found to update.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Student updated successfully' },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
