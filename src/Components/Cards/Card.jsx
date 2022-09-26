import React from "react";
import "../Cards/card.css";

const Card = (props) => {
  return (
        <div key={props.index} className="card">
          <h2 className="card-number">
            {props.card}
            {props.suits}
          </h2>
    </div>
  );
};

export default Card;
