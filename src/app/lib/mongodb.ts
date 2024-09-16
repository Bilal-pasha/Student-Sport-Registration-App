import { MongoClient } from 'mongodb';

// Ensure that the MongoDB URI is present in environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Create a new MongoClient instance without deprecated options
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

// Check if the code is running in development or production mode
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to avoid creating multiple connections
  (global as any).mongoClient = client;
  clientPromise = (global as any).mongoClient.connect();
} else {
  // In production mode, use the client directly
  clientPromise = client.connect();
}

export default clientPromise;
