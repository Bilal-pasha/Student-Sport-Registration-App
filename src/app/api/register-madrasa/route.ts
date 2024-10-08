
import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { madrasaName, madrasaAddress, totalStudents, userId, ContactPersonName, CellNumber } = body;

    const client = await clientPromise;
    const db = client.db('school');

    const result = await db.collection('madrasas').insertOne({
      madrasaName,
      madrasaAddress,
      totalStudents,
      ContactPersonName,
      CellNumber,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Madrasa registered successfully', data: result }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}



