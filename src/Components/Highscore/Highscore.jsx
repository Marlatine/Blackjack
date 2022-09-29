import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../Button/Button";
import List from "./List";
import "./highscore.css";

const Highscore = ({ onStartClick }) => {
  const [highscoreList, setHighscoreList] = useState([]);

  useEffect(() => {
    const highscoreListLocal = JSON.parse(
      window.localStorage.getItem("highscoreList") || "[]"
    );
    setHighscoreList(highscoreListLocal);
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Highscore</h1>
        </div>
        <div className="highscore-list">
          {highscoreList.map((index, value) => {
            return <List key={value} name={index.name} score={index.score} />;
          })}
          <div className="button-container">
            <Button onClick={onStartClick} text="Back" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Highscore;
