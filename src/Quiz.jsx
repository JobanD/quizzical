import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import "./css/quiz.css";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function decodeHTMLEntities(str) {
    var entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x27", "'"],
      ["#x2F", "/"],
      ["#39", "'"],
      ["#47", "/"],
      ["lt", "<"],
      ["gt", ">"],
      ["nbsp", " "],
      ["quot", '"'],
    ];

    if (str && typeof str === "string") {
      // strip script/html tags
      // solution taken from https://stackoverflow.com/questions/5796718/html-entity-decode
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      for (var i = 0, max = entities.length; i < max; ++i)
        str = str.replace(
          new RegExp("&" + entities[i][0] + ";", "g"),
          entities[i][1]
        );
    }
    return str;
  }

  // Fetch API and set States with received data
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setQuiz(data.results);
      })
      .catch((error) => setError(error));

    setLoading(false);
  }, [loading]);

  const questionsAll = quiz.map((q, i) => (
    <Question
      key={nanoid()}
      question={decodeHTMLEntities(q.question)}
      answer={q.correct_answer}
      wrongAnswers={q.incorrect_answers}
      options={[q.correct_answer, ...q.incorrect_answers]}
      decode={decodeHTMLEntities}
      id={i + 1}
    />
  ));

  return (
    <div className="quiz-container">
      <div className="blob1">
        <p></p>
      </div>
      <div className="question-container">{questionsAll}</div>
      <div className="submit-button-container">
        <button className="submit-button">Check Answers</button>
      </div>
      <div className="blob2">
        <p></p>
      </div>
    </div>
  );
}
