import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      
      const { id: userId } = params;
      const client = await clientPromise;
      const db = client.db('school');
  
      // Query the collection using the userId
      let madrasas;
      if (userId === 'bilal.pasha@techwards.co') {
        // Return all madrasas
        madrasas = await db.collection('madrasas').find().toArray();
      } else {
        // Return madrasas associated with the userId
        madrasas = await db.collection('madrasas').find({ userId }).toArray();
      }

      if (madrasas.length === 0) {
        return NextResponse.json({ success: false, message: "No madrasas found for this user" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: madrasas }, { status: 200 });
  
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }