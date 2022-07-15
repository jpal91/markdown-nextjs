import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { monitorCommands: true });
const db = client.db("md");
const col = db.collection("users");

const handler = async (req, res) => {
    if (req.method !== 'POST') {
		res.status(400).send('Unknown')
		return
	}

    const { fileName, date, md } = req.body

	try {
		await client.connect()

		await col.updateOne(
			{ user: "1" },
            { $set: { [`docs.${fileName}`]: { date: date, md: md } } }
		)

        const result = await col.findOne(
            { user: "1" }
        )

		return res.status(200).send(result)
	} catch (error) {
		console.log(error.message)
	} finally {
		await client.close()
	}
};

export default handler;