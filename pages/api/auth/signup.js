import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { monitorCommands: true });
const db = client.db("md");
const col = db.collection("users");

import { hashPassword } from "../../../helpers/auth";

const handler =  async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).send('Unknown')
    }

    const { user, password } = req.body

    try {
        await client.connect()

        const newUser = await col.findOne(
            { user: user }
        )

        if (newUser) {
            throw new Error('User already created')
        }

        const hPassword = await hashPassword(password)

        await col.insertOne(
            { user: { username: user, password: hPassword }, docs: {} }
        )

        res.status(201).send('User Created')
    
    } catch (error) {
        console.log(error.message)
    } finally {
        await client.close()
    }
}

export default handler