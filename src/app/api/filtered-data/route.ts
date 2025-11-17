import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { activity, ageGroup, campNumber, madrasa, status, subCamp, tShirtSize, group } = body;

        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db('school');

        // Find madrasa by its name
        // const selectedMadrasa = await db.collection('madrasas').find({ madrasaName: madrasa }).toArray();
        // Initialize the filter object
        const filter: Record<string, any> = {};

        // Dynamically build filter object
        if (activity) filter.activity = new RegExp(activity, 'i');
        if (ageGroup) {
            // Convert age group to age range filter
            if (ageGroup === "13-16") {
                filter.age = { $gte: 13, $lte: 16 };
            } else if (ageGroup === "17-20") {
                filter.age = { $gte: 17, $lte: 20 };
            }
        }
        if (campNumber) filter.camp = campNumber;
        if (status) filter.status = new RegExp(status, 'i');
        if (subCamp) filter.subCamp = new RegExp(subCamp, 'i');
        if (madrasa !== "Madrasa Sayyadina Bilal(R.A)") { filter.madrasaName = new RegExp(madrasa, 'i') } else { filter.madrasaName = madrasa }
        if (tShirtSize) filter.TshirtSize = new RegExp(tShirtSize, 'i');
        if (group) filter.group = new RegExp(group, 'i');
        const result = await db.collection('students').find(filter).toArray();

        // Return the response with the filtered results
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error: any) {
        // Handle errors and return a failure response
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
