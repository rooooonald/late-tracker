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

  if (req.method === "PUT") {
    try {
      await db.collection("events").updateOne(
        {
          id: req.query.params[0],
          "compensationDetails.onTime.participant": req.query.params[1],
        },
        { $set: { "compensationDetails.onTime.$.isCompensated": true } }
      );
      res.status(200).json({ message: "Compensation Completed!" });
    } catch (err) {
      res.status(500).json({ message: "Fail to compensate!" });
    }
    client.close();
  }
}
