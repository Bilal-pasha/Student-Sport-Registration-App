import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
// use this as a mock data replace it later with actual data

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const client = await clientPromise;
    const db = client.db('school');

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const student = await db.collection('students').findOne({ _id: new ObjectId(id) });

    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // Define the monthly fees status with all months set to "Not Paid"

    // Add the fees status object to the student object

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db('school');

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const result = await db.collection('students').deleteOne({ _id: new ObjectId(id as string) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Student deleted successfully', delete: true });
    } else {
      return NextResponse.json({ message: 'Student not found', delete: false });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: any, res: NextApiResponse) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('school');

    const { name, studentId: id, fatherName, rollNumber, fees, feesStatus } = body;

    // Use $set to update the specific fields in the student document
    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(id as string) }, 
      { $set: { name, fatherName, rollNumber, fees, feesStatus } }  // Corrected update syntax
    );

    if (result.modifiedCount === 1) {
      const updatedStudent = await db.collection('students').findOne({ _id: new ObjectId(id as string) });
      return NextResponse.json({ message: 'Student updated successfully', body: updatedStudent });
    } else {
      return NextResponse.json({ message: 'Student not found' });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}