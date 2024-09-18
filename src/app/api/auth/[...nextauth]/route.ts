import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/app/lib/mongodb"; // Import the MongoClient connection
import bcrypt from "bcryptjs";
import { Db } from "mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;  // Return null if credentials are missing
        }

        // Get the MongoDB connection
        const client = await clientPromise;
        const db: Db = client.db();

        // Fetch user from the database
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          return null; // Return null if no user is found
        }

        // Compare password
        const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
        if (!isValidPassword) {
          return null; // Return null if password is invalid
        }

        // If credentials are valid, return the user object
        return { email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

// Export for both GET and POST methods in Next.js 13+ API routes
export { handler as GET, handler as POST };