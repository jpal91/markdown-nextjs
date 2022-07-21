import { promises as fs } from 'fs'
import path from 'path'

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