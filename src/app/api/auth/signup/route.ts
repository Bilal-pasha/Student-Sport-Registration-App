import clientPromise from '@/lib/mongodb';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
    try {
    const body = await req.json();
    const { username, password } = body;
    const client = await clientPromise;
    const db = client.db('school');

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' });
    }

    // Insert new user into the database
    await db.collection('users').insertOne({
      username,
      password,  // Store the hashed password
    });

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}
