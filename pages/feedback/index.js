import { useState, Fragment } from "react";
import { buildFeedPath, extractFeedback } from "../api/feedback";

const GetFeedback = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedBackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFeedbackData(data.feedback);
      });
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedBackText}
            <button onClick={loadFeedBackHandler.bind(null, item.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
