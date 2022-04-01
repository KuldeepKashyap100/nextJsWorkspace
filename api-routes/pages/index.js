import {useRef, useState} from "react";

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        feedback: feedbackInputRef.current.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label id="email" htmlFor="">Email: </label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label id="feedback" htmlFor="">Feedback: </label>
          <textarea type="feedback" id="feedback" row="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
