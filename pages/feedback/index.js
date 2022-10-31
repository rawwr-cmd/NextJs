import { buildFeedPath, extractFeedback } from "../api/feedback";

const GetFeedback = ({ feedbackItems }) => {
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}>{item.feedBackText}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default GetFeedback;
