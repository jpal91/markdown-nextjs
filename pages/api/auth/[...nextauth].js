import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoClient } from 'mongodb';

import { verifyPassword } from '../../../helpers/auth';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { monitorCommands: true });
const db = client.db("md");
const col = db.collection("users");

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                username: true,
                password: true,
            },
            async authorize(credentials, req) {
                console.log(credentials)
                try {
                    await client.connect()

                    const result = await col.findOne(
                        { "user.username": credentials.username }
                    )

                    if (!result) {
                        throw new Error('No user found!')
                    }

                    const isValid = await verifyPassword(credentials.password, result.user.password)

                    if (!isValid) {
                        throw new Error('Unable to log you in')
                    }

                    return result.user.username

                } catch (error) {
                    console.log(error)
                    return null
                } finally {
                    client.close()
                }
            }
        })
    ]
})