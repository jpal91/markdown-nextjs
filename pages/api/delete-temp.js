import fs from "fs-extra";
import path from "path";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).send("Unknown");
    }

    const { fileName } = req.body;

    const filePath = path.join(process.cwd(), "public", "temp");

    // if (all) {
    //     await fs.emptyDir(`${filePath}/`)
    // } else if (!all) {
    //     await fs.rm(`${filePath}/${fileName}.md`)
    // }

    await fs.rm(`${filePath}/${fileName}.md`, { recursive: true, maxRetries: 2 });

    res.status(200).send("Deleted");
};

export default handler;
