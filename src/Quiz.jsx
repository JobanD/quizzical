import React, { useState, useEffect, useCallback, useRef } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import "./css/quiz.css";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const answers = useRef([null, null, null, null, null]);
  const [completed, setCompleted] = useState(false); // toggle on completion of quiz
  const [score, setScore] = useState(0);

  // to use with redo quiz button
  function refreshPage() {
    window.location.reload(false);
  }

  // update answer array
  // use to compare answers to correct answers when quiz submitted
  function updateAnswer(value, questionID) {
    return (answers.current[questionID] = value);
  }

  // this function takes out html entities that are present in the data taken from the api
  function decodeHTMLEntities(str) {
    var entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x27", "'"],
      ["#x2F", "/"],
      ["#39", "'"],
      ["#039", "'"],
      ["#47", "/"],
      ["lt", "<"],
      ["gt", ">"],
      ["nbsp", " "],
      ["quot", '"'],
      ["eacute", "é"],
      ["ldquo", '"'],
      ["rdquo", '"'],
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

  // Fetch API and set States with received data ON MOUNT
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
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setQuiz(null);
      })
      .finally(() => {
        setLoading(false);
        setCompleted(false);
      });

    setLoading(false);
  }, [loading]);

  // function to run on click of check answers
  // highlight correct/incorrect answers, give user a score, and provide option to play again
  function checkAnswers() {
    let count = [];
    quiz.map((q, i) =>
      q.correct_answer == answers.current[i]
        ? count++
        : console.log("incorrect")
    );
    setCompleted(true);
    setScore((prevScore) => (prevScore = count));
  }

  // create question components with custom question component
  // encompasses quiz question + the multiple choice answers
  const questionsAll = quiz.map((q, i) => (
    <Question
      key={nanoid()}
      question={decodeHTMLEntities(q.question)}
      answer={q.correct_answer}
      wrongAnswers={q.incorrect_answers}
      options={[q.correct_answer, ...q.incorrect_answers]}
      decode={decodeHTMLEntities}
      id={i}
      updateAnswer={updateAnswer}
      completed={completed}
      userAnswers={answers}
    />
  ));

  return (
    <div className="quiz-container">
      <div className="blob1">
        <p></p>
      </div>
      <div className="question-container">{questionsAll}</div>
      <div className="submit-button-container">
        {completed ? (
          <>
            <h3>You scored {score}/5 correct answers</h3>
            <button className="submit-button" onClick={refreshPage}>
              Redo Quiz
            </button>
          </>
        ) : (
          <button className="submit-button" onClick={checkAnswers}>
            Check Answers
          </button>
        )}
      </div>
      <div className="blob2">
        <p></p>
      </div>
    </div>
  );
}
