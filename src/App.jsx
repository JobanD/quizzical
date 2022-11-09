import { useState, useEffect } from "react";
import "./css/index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}
