import { MongoClient } from 'mongodb';

// Ensure that the MongoDB URI is present in environment variables
const uri: string = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a new MongoClient instance
const client: MongoClient = new MongoClient(uri);

// Use a global type declaration to avoid type issues in development mode
let clientPromise: Promise<MongoClient>;

declare global {
  // Allows using 'global' for MongoClient in development mode
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid creating multiple connections
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, use the client directly
  clientPromise = client.connect();
}

export default clientPromise;
