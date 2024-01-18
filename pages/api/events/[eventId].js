import connectToDB from "@/lib/db";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectToDB();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cannot connect to Database", error: err.message });
  }

  if (req.method === "GET") {
    try {
      const db = client.db("late-tracker");
      const result = await db
        .collection("events")
        .findOne({ id: req.query.eventId });
      res.status(200).json({ result: result });
    } catch (err) {
      res.status(500).json({ message: "Cannot find event!" });
    }
    client.close();
  }

  if (req.method === "PUT") {
    try {
      const db = client.db("late-tracker");
      const result = await db
        .collection("events")
        .updateOne({ id: req.query.eventId }, { $set: { status: "done" } });
      res.status(200).json({ result: result });
    } catch (err) {
      res.status(500).json({ message: "Cannot find event!" });
    }
    client.close();
  }
}
