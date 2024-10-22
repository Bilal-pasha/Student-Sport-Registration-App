import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from './mongodb';
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db('school');

        const user = await db.collection('users').findOne({ username: credentials.username });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id.toString(), name: user.username }; // Convert ObjectId to string
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // user.id is a string
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id; // Now TypeScript knows session.id exists
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

export default authOptions;
