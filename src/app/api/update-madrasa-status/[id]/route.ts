import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;  // Get id from the URL
  const { status } = await request.json();
  try {
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Madrasa ID and status are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("school");

    const result = await db.collection("madrasas").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No madrasa found with the provided ID or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Madrasa status updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
