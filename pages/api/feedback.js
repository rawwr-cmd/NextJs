import fs from "fs";
import path from "path";

export const buildFeedPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

const handler = (req, res) => {
  if (req.method === "POST") {
    const { email, text: feedBackText } = req.body;

    const fetchedData = {
      id: new Date().toISOString(),
      email,
      feedBackText,
    };
    //store that in a database or in a file
    const filePath = buildFeedPath();
    const data = extractFeedback(filePath);
    data.push(fetchedData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: fetchedData });
  } else {
    const filePath = buildFeedPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
};

export default handler;
