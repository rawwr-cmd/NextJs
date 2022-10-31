import { buildFeedPath, extractFeedback } from "./index";

const handler = (req, res) => {
  // if (req.method === "Delete") {}

  const { feedbackId } = req.query;

  const filePath = buildFeedPath();
  const data = extractFeedback(filePath);

  const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
