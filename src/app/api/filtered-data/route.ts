import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { activity, age, campNumber, madrasa, status, subCamp } = body;

        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db('school');

        // Find madrasa by its name
        // const selectedMadrasa = await db.collection('madrasas').find({ madrasaName: madrasa }).toArray();
        // Initialize the filter object
        const filter: Record<string, any> = {};

        // Dynamically build filter object
        if (activity) filter.activity = new RegExp(activity, 'i');
        if (age) filter.age = Number(age);
        if (campNumber) filter.camp = campNumber;
        if (status) filter.status = new RegExp(status, 'i');
        
        // Ensure selectedMadrasa has results before accessing _id
        // if (selectedMadrasa) {
        //     filter._id = selectedMadrasa[0]._id.toString();  // Access first madrasa object and its _id
        // }
        if (subCamp) filter.subCamp = new RegExp(subCamp, 'i');
        // Query the students collection with the filter
        const result = await db.collection('students').find(filter).toArray();
        console.log(result)

        // Return the response with the filtered results
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error: any) {
        // Handle errors and return a failure response
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
