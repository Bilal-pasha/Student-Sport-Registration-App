import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, newPassword } = body;
        const client = await clientPromise;
        const db = client.db("school");

        const user = await db.collection("users").findOne({ username: username });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found." },
                { status: 404 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await db.collection("users").updateOne(
            { username },
            { $set: { password: hashedPassword } }
        );

        return NextResponse.json(
            { success: true, message: "Password has been reset successfully." },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
