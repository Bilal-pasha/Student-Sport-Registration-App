import clientPromise from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface Student {
  studentName: string;
  fatherName: string;
  rollNumber: number;
  age: number;
  grade: string;
  madrasaId: string;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const madrasaId = params.id;
  
    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('school'); // Replace with your MongoDB database name
  
      // Find students registered under the given madrasaId
      const students = await db.collection('students').find({ madrasaId }).toArray();
  
    //   if (!students || students.length === 0) {
    //     return NextResponse.json({ message: 'No students found for this madrasa' }, { status: 404 });
    //   }
  
      // Return the list of students
      return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
      console.error('Error fetching students:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
