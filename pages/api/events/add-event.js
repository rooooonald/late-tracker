import connectToDB from "@/lib/db";

import uniqid from "uniqid";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectToDB();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cannot connect to Database", error: err.message });
  }

  if (req.method === "POST") {
    try {
      const db = client.db("late-tracker");
      const dataBody = req.body;
      const id = uniqid();
      const result = await db
        .collection("events")
        .insertOne({ id, ...dataBody, status: "active" });

      res
        .status(201)
        .json({ message: "Event added successfully!", eventId: id });
    } catch (err) {
      res.status(500).json({ message: "Cannot add event!" });
    }
    client.close();
  }
}
