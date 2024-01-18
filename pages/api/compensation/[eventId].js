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

  const db = client.db("late-tracker");

  if (req.method === "POST") {
    try {
      const dataBody = req.body;
      if (dataBody.late.length === 0) {
        await db
          .collection("events")
          .updateOne(
            { id: req.query.eventId },
            { $set: { status: "done", compensationDetails: dataBody } }
          );
        res.status(201).json({
          message: "Event Close!",
        });
      } else {
        await db.collection("events").updateOne(
          {
            id: req.query.eventId,
          },
          {
            $set: {
              status: "compensation",
              compensationDetails: dataBody,
            },
          }
        );
        res.status(201).json({
          message: "Compensation event added successfully!",
          compensation: dataBody,
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Cannot add compensation!" });
    }
    client.close();
  } else if (req.method === "GET") {
    try {
      const result = await db
        .collection("events")
        .findOne({ id: req.query.eventId });
      res.status(200).json({ result: result });
    } catch (err) {
      res.status(500).json({ message: "Cannot find events!" });
    }
    client.close();
  }
}
