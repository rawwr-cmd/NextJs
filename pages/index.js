import { useRef } from "react";

export default function Home() {
  const emailInputRef = useRef();
  const feedBackRef = useRef();

  const submitFormhandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredfeedBack = feedBackRef.current.value;

    // optional: Add validation

    const reqBody = {
      email: enteredEmail,
      text: enteredfeedBack,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormhandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="5"
            ref={feedBackRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}
