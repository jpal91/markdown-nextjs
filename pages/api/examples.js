import { promises as fs } from 'fs'
import path from 'path'

//Handles reading file directory for Examples
//See components/SideNav/FileList/directory()
const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).send('Unknown')
    }
    
    const dirPath = path.join(process.cwd(), 'public', 'examples')

    const post = await fs.readdir(dirPath)

    return res.status(200).send(post)
}

export default handler