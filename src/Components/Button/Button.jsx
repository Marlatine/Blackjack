import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick} disabled={props.disableBtn}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
