import { MongoClient } from 'mongodb';

export async function dbConnect() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  });

  return client;
}
