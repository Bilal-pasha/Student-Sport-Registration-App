
import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { madrasaName, madrasaAddress, totalStudents, userId, contactPersonName, cellNumber } = body;

    const client = await clientPromise;
    const db = client.db('school');
    const result = await db.collection('madrasas').insertOne({
      madrasaName,
      madrasaAddress,
      totalStudents,
      contactPersonName,
      cellNumber,
      status: "Pending",
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Madrasa registered successfully', data: result }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('school');

    // Fetch all madrasa names from the collection
    const result = await db.collection('madrasas').find({}, { projection: { madrasaName: 1, _id: 0 } }).toArray();
    // Extract madrasaName from the result
    const madrasaNames = result.map((madrasa) => madrasa.madrasaName);

    return NextResponse.json({ success: true, data: madrasaNames }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}



