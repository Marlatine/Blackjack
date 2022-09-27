import React, { useEffect, useState } from "react";
import "./startMenu.css";

const StartMenu = ({ onStartClick }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    localStorage.setItem("Name", JSON.stringify(name));
  }, [name]);

  return (
    <div className="main">
      <h1>Blackjack</h1>
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
