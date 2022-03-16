import React from "react";

// Styles
import style from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <ul className={`${style.ul} ${props.className}`}>
      {props.navigationList.map((nav) => (
        <li key={nav.id}>
          <a href={nav.link}>{nav.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
