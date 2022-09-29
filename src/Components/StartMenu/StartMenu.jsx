import React, { useState } from "react";
import "./startMenu.css";

const StartMenu = ({ onStartClick }) => {
  const [name, setName] = useState("");

  function findUserInLocal(name) {
    window.localStorage.getItem(name);
    if (!window.localStorage.getItem(name)) {
      window.localStorage.setItem(name, 0);
      return { name: name, score: window.localStorage.getItem(name) };
    }
  }

  function handleStartClick() {
    const user = findUserInLocal(name);
    window.localStorage.setItem("currentUser", name);
    onStartClick();
  }

  return (
    <div className="main">
      <h1>Blackjack</h1>
      <input
        className="name-input"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="startButton" onClick={handleStartClick}>
        Start Game
      </button>
    </div>
  );
};

export default StartMenu;
