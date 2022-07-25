import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";


import { verifyPassword } from "../../../helpers/auth";
import clientPromise from "../../../helpers/mongodb";

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

                    const user = { name: result.user.username }

                    return user

                } catch (error) {
                    console.log(error)
                    return null
                } finally {
                    client.close()
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    debug: true,
    logger: {
        error(code, metadata) {
          console.error(code, metadata)
        },
        warn(code) {
          console.warn(code)
        },
        debug(code, metadata) {
          console.debug(code, metadata)
        }
      }
})

// const auth = async (req, res) => {
//     const providers = [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             type: "credentials",
//             credentials: {
//                 username: true,
//                 password: true,
//             },
//             async authorize(credentials, req) {
//                 try {
//                     await client.connect();

//                     const result = await col.findOne({
//                         "user.username": credentials.username,
//                     });

//                     if (!result) {
//                         throw new Error("No user found!");
//                     }

//                     const isValid = await verifyPassword(
//                         credentials.password,
//                         result.user.password
//                     );

//                     if (!isValid) {
//                         throw new Error("Unable to log you in");
//                     }

//                     const user = { name: result.user.username };

//                     return user;
//                 } catch (error) {
//                     console.log(error);
//                     return null;
//                 } finally {
//                     client.close();
//                 }
//             },
//         }),
//     ];

//     const session = {
//         strategy: 'database'
//     }

//     console.log(req.query.nextauth)

//     const isCredentials = req.query.nextauth.includes('credentials')

//     if (isCredentials) {
//         session.strategy = 'jwt'
//     }

//     console.log(session.strategy)

//     return await NextAuth(req, res, {
//         providers: providers,
//         session: session,
//         adapter: MongoDBAdapter(clientPromise)
//     })
// };

// export default auth