import React from "react";

// Components
import Navigation from "./HeaderParts/Navigation";
import NavigationLogo from "./HeaderParts/NavigationLogo";
import Button from "../UI/Button/Button";

// Styles
import style from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={style.header}>
      <NavigationLogo />
      <div className={style.container}>
        <div className={style.navigation}>
          <Navigation />
        </div>
        <div>
          <Button className={style.button}>Login</Button>
          <Button className={style.button}>Hello</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
