import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Styles
import style from "./Navigation.module.css";

// Returns a list of accessible pages by a user.
const Navigation = (props) => {
  return (
    <nav>
      {props.isLoggedIn ? (
        <ul className={`${style.ul} ${props.className}`}>
          <li>
            <NavLink className={style.navlink} to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/create_a_script">Create a script</NavLink>
          </li>
          <li>
            <NavLink to="my_scripts">Scripts</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      ) : (
        <ul className={`${style.ul} ${props.className}`}>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
