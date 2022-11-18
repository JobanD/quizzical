import React, { useState, useEffect, useMemo, useCallback } from "react";

export default function Question(props) {
  // state used to store selected option
  const [selected, setSelected] = useState([]);
  const styles = (item) => {
    if (props.completed) {
      if (props.userAnswers.current[props.id] === props.answer) {
        // if selected answer was correct highlight answer green
        return {
          backgroundColor: props.answer === item.value ? "#94D7A2" : "white",
        };
      } else {
        // if answer was incorrect ->
        // highlight correct answer green, selected answer red, and other options leave white
        return {
          backgroundColor:
            props.answer === item.value
              ? "#94D7A2"
              : item.value === props.userAnswers.current[props.id]
              ? "#F8BCBC"
              : "white",
        };
      }
    }
    return {
      backgroundColor: item.id === selected[0] ? "#D6DBF5" : "white",
    };
  };

  function randomizeOptions(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  //state used to store object containing information about each potential answer
  const [optionsObj, setOptionsObj] = useState(() =>
    randomizeOptions(props.options).map((op, i) => {
      return {
        id: i,
        value: props.decode(op),
        isClicked: false,
      };
    })
  );

  // handle selecting options and save in state
  const clickHandler = (row) => {
    setSelected([row.id, row.value]);
    props.updateAnswer(row.value, props.id);
  };

  const formatOptions = optionsObj?.map((item) => (
    <button
      key={item.id}
      className="button"
      onClick={() => clickHandler(item)}
      style={styles(item)}
      disabled={props.completed ? true : false}
    >
      {props.decode(item.value)}
    </button>
  ));

  return (
    <div className="question">
      <h3>{props.question}</h3>
      <div className="buttons-container">{formatOptions}</div>
      <br></br>
    </div>
  );
}
