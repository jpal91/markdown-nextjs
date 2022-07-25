import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { monitorCommands: true });
const db = client.db("md");
const col = db.collection("users");

const newUserObj = {
    user: {
        username: "",
    },
    docs: {},
};

const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).send("Unknown");
        return;
    }

    const { user } = req.body;

    try {
        await client.connect();

        const result = await col.findOne({ "user.username": user });

        if (!result) {
            newUserObj.user.username = user;
            await col.insertOne(newUserObj);
            return res.status(200).send(newUserObj);
        }

        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
    } finally {
        await client.close();
    }
};

export default handler;
