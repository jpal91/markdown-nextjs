import { readFile } from "node:fs";
import path from "path";

const handler = async (req, res) => {
  const filePath = path.join(process.cwd(), "README.md");
  const data = await readFile(filePath, "utf8");
  console.log(data);
  res.status(200).send("Hello");
};

export default handler;
