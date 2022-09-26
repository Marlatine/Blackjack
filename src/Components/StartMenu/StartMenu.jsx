import React, { useState } from "react";
import "./startMenu.css";

const StartMenu = ({ onStartClick }) => {
  const [name, setName] = useState("");

  localStorage.setItem("Name", name);

  return (
    <div className="main">
      <h1>Blackjack</h1>
      <h2>Enter name</h2>
      <input
        className="name-input"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="startButton" onClick={onStartClick}>
        Start Game
      </button>
    </div>
  );
};

export default StartMenu;
