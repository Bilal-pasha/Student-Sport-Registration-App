import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import bcrypt from 'bcryptjs';

type Data = {
  message: string;
};

// Ensure body parsing is enabled (default behavior)
export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: any, res: NextApiResponse<Data>) {
  const body = await req.json();
  try {
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' });
    }

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
    };

    await db.collection('users').insertOne(newUser);

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
