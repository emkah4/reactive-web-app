import React from "react";

// Styles
import style from "./Footer.module.css";

// Modules
import Navigation from "./Navigation";
import NavigationLogo from "./LayoutAssets/NavigationLogo";
import { NavLink } from "react-router-dom";

const Footer = (props) => {
  
  return (
    <footer className={style.footer}>
      <div>
        <Navigation className={style.nav} />
      </div>
      <div></div>
      <NavLink to='/home'>
        <div className={style["footer-logo"]}>
          <NavigationLogo></NavigationLogo>
        </div>
      </NavLink>
    </footer>
  );
};

export default Footer;
