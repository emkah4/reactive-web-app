import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import style from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <nav>
      <ul className={`${style.ul} ${props.className}`}>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/create_a_script">Create a script</NavLink>
        </li>
        <li>
          <NavLink to="my_scripts">My scripts</NavLink>
        </li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
