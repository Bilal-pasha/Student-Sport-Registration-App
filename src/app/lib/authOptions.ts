// File: /app/lib/authOptions.ts
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Uncomment and configure the CredentialsProvider if needed
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  // Customize pages if needed
};
