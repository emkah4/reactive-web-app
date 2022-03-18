import React from "react";

// Components
import Navigation from "./Navigation";
import NavigationLogo from "./LayoutAssets/NavigationLogo";
import Button from "../UI/Button/Button";

// Styles
import style from "./Header.module.css";

const Header = (props) => {
  const navList = [
    {
      id: "footer-nav-1",
      title: "Create a script",
      link: "#",
    },
    {
      id: "footer-nav-2",
      title: "My scripts",
      link: "#",
    },
    {
      id: "footer-nav-3",
      title: "About",
      link: "#",
    },
  ];
  return (
    <header className={style.header}>
      <NavigationLogo />
      <div className={style.container}>
        <div className={style.navigation}>
          <Navigation className={style.ul} navigationList={navList} />
        </div>
        <div>
          <Button>Profile</Button>
          <Button onClick={props.onLogout}>Sign out</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
