import React from "react";

// Styles
import style from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <ul className={style.ul}>
      <li>
        <a href="#">Create A Script</a>
      </li>
      <li>
        <a href="#">My Scripts</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
    </ul>
  );
};

export default Navigation;
