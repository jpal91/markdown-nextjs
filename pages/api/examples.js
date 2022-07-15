import { promises as fs } from 'fs'
import path from 'path'

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).send('Unknown')
    }
    
    const dirPath = path.join(process.cwd(), 'public', 'examples')

    const post = await fs.readdir(dirPath)

    return res.status(200).send(post)
}

export default handler