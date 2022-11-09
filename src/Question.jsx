import React, { useState, useEffect } from "react";

export default function Question(props) {
  //const [isClicked, setIsClicked] = useState(false);
  const options = [];
  options.push({
    id: 1,
    value: props.answer,
    isClicked: false,
    isCorrect: true,
  });
  props.wrongAnswers.map((op, i) =>
    options.push({
      id: i + 2,
      value: op[i],
      isClicked: false,
      isCorrect: false,
    })
  );
  const [optionsState, setOptionsState] = useState(options);
  const styles = {
    backgroundColor: optionsState.isClicked ? "blue" : "white",
  };
  // randomize options so that correct answer is not always in the same spot
  function randomizeOptions(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  randomizeOptions(options);
  console.log(optionsState);
  //
  //
  function onClick(id) {
    console.log(id);
    setOptionsState((prevState) =>
      prevState.map((op) => {
        return op.id === id ? { ...op, isClicked: !op.isClicked } : op;
      })
    );
  }

  console.log(optionsState);

  const formatOptions = optionsState.map((op) => (
    <button className="option" onClick={() => onClick(op.id)} style={styles}>
      {op.value}
    </button>
  ));

  return (
    <div className="question-container">
      <h3>{props.question}</h3>
      {formatOptions}
      <br></br>
    </div>
  );
}
