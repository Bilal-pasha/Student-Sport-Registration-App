import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { activity, age, camp, madrasa, status, subCamp } = body;
        const client = await clientPromise;
        const db = client.db('school');

        // Build the filter object dynamically with case-insensitivity for string fields
        const filter: any = {};
        if (activity) filter.activity = new RegExp(activity, 'i');
        if (age) filter.age = Number(age);
        if (camp) filter.camp = camp;
        if (madrasa) filter.madrasa = new RegExp(madrasa, 'i');
        if (status) filter.status = new RegExp(status, 'i');
        if (subCamp) filter.subCamp = new RegExp(subCamp, 'i');

        // Query the students collection with the filter
        const result = await db.collection('students').find(filter).toArray();
        console.log(filter)
        // Return the filtered result
        return NextResponse.json({ success: true, data: result }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
