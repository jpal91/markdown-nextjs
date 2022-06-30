import { useEffect } from "react";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "README.md");
const dataFile = fs.readFile(filePath, "utf8", (err, data) => {
  console.log(data);
});

const Data = () => {
  useEffect(() => {
    dataFile();
  }, []);

  return <p>Hello</p>;
};

export default Data;
