import React from "react";

import styles from "./Button.module.css";

function Button(props) {

  return (
    <button
      className={`${styles.button} ${styles[props.className]}`}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
}

export default Button;
