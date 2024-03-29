import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { monitorCommands: true });
const db = client.db("md");
const col = db.collection("users");

//Handles sending renamed file to db
//See actions/db
const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).send("Unknown");
        return;
    }

    const { newDoc, oldFN, newFN, user } = req.body;

    try {
        await client.connect();

        await col.updateOne(
            { "user.username": user },
            {
                $unset: { [`docs.${oldFN}`]: "" },
                $set: { [`docs.${newFN}`]: newDoc },
            }
        );

        const result = await col.findOne({ "user.username": user });

        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
    } finally {
        await client.close();
    }
};

export default handler;
