import fs from "fs-extra";
import path from "path";

//Handles deleting the temporary document after it's created (./write-file) and downloaded
//See components/NavBar/SideNav/SideNav/handleDownload()
const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).send("Unknown");
    }

    const { fileName } = req.body;

    const filePath = path.join(process.cwd(), "public", "temp");

    await fs.rm(`${filePath}/${fileName}.md`, { recursive: true, maxRetries: 2 });

    res.status(200).send("Deleted");
};

export default handler;
