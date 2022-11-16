import React, { useState, useEffect } from "react";

export default function Question(props) {
  // state used to store selected option
  const [selected, setSelected] = useState(0);

  function randomizeOptions(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // state used to store object containing information about each potential answer
  const [optionsObj, setOptionsObj] = useState(() =>
    randomizeOptions(props.options).map((op, i) => {
      return {
        id: i,
        value: op,
        isClicked: false,
      };
    })
  );

  const change = (row) => {
    setSelected(row.id);
  };

  const formatOptions = optionsObj?.map((item) => (
    <button
      key={item.id}
      className="button"
      onClick={() => change(item)}
      style={{ backgroundColor: item.id === selected ? "#D6DBF5" : "white" }}
    >
      {item.value.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "")}
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
