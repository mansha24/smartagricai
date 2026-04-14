import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;

export async function connectMongo() {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri, {
    appName: "SmartAgriAI",
  });

  await client.connect();
  cachedClient = client;
  return client;
}
