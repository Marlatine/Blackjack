import React from "react";

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
