import React from "react";
import "../Cards/card.css";

const Card = (props) => {
  return (
        <div key={props.index} className="card">
          <img src={props.image} alt="Picture of cards"/>
    </div>
  );
};

export default Card;
