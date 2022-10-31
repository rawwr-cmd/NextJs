import fs from "fs";
import path from "path";
const handler = (req, res) => {
  if (req.method === "POST") {
    const { email, text: feedBackText } = req.body;

    const fetchedData = {
      id: new Date().toISOString(),
      email,
      feedBackText,
    };
    //store that in a database or in a file
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(fetchedData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: fetchedData });
  } else {
    res.status(200).json({ message: "This is a feedback API" });
  }
};

export default handler;
