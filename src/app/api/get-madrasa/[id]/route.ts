import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      
      const { id: userId } = params;
      const client = await clientPromise;
      const db = client.db('school');
      // Query the collection using the userId
      let madrasas;
      if (userId === 'admin') {
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

  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      const client = await clientPromise;
      const db = client.db('school');
  
      // Validate the ID format
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: 'Invalid ID format' }, { status: 400 });
      }
  
      // Attempt to delete the madrasa
      const result = await db.collection('madrasas').deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 1) {
        // Get the remaining madrasas after deletion (No filter by id)
        const remainingMadrasas = await db.collection('madrasas').find({ id }).toArray();
  
        return NextResponse.json({
          success: true,
          message: 'Madrasa deleted successfully',
          remainingMadrasas: remainingMadrasas,
        }, { status: 200 });
      } else {
        return NextResponse.json({ success: false, message: 'Madrasa not found' }, { status: 404 });
      }
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  