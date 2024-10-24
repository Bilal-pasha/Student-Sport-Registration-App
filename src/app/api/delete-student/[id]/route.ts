import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from "mongodb";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('school');

        const result = await db.collection('students').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Student not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Student deleted successfully.' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
