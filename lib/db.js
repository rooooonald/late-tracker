import { MongoClient } from "mongodb";

export default async function connectToDB() {
  try {
    const client = new MongoClient(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.krwlyqt.mongodb.net/?retryWrites=true&w=majority`
    );

    const connected = await client.connect();

    return connected;
  } catch (err) {
    throw new Error(err.message);
  }
}
