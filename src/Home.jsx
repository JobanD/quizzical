import React from "react";

export default function Home() {
  return (
    <div className="homepage">
      <div className="blob1">
        <p></p>
      </div>
      <div className="home-container">
        <h1>Quizzical</h1>
        <p>Click Start Quiz to start playing!</p>
        <a href="./quiz">
          <button className="start-quiz-button">Start Quiz</button>
        </a>
      </div>
      <div className="blob2">
        <p></p>
      </div>
    </div>
  );
}
