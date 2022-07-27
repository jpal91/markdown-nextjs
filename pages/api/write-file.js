import { promises as fs } from 'fs'
import path from 'path'

//Handles the writing of a document so it can be downloaded 
//See components/NavBar/SideNav/SideNav/handleDownload()
const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).send('Unknown')
    }

    const { content, name } = req.body
    const filePath = path.join(process.cwd(), "public", "temp")

    await fs.writeFile(`${filePath}/${name}.md`, content, { flag: 'wx' })
        .then(() => {
            res.status(200).send('Completed')
        })
        .catch(() => {
            res.status(500).send('Error')
        })

    
}

export default handler