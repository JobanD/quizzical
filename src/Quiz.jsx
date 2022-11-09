import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
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
      .catch((error) => console.log(error));
  }, []);

  const questionsAll = quiz.map((q, i) => (
    <Question
      key={nanoid()}
      question={quiz[i].question}
      answer={quiz[i].correct_answer}
      wrongAnswers={quiz[i].incorrect_answers}
      id={i + 1}
    />
  ));

  return <div>{questionsAll}</div>;
}
