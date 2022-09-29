import React from "react";
import "./highscore.css"

const List = (props) => {
  return (
    <ul className="list">
      <li className="list-items">
        <span>{props.name}</span>
        <span>{props.score}</span>
      </li>
    </ul>
  );
};

export default List;
