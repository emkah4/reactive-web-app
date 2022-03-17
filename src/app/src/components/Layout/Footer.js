import React from "react";

// Styles
import style from "./Footer.module.css";

// Modules
import Navigation from "./Navigation";
import NavigationLogo from "./LayoutAssets/NavigationLogo";

const Footer = (props) => {
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
    <footer className={style.footer}>
      <div>
        <Navigation className={style.nav} navigationList={navList} />
      </div>
      <div></div>
      <div className={style["footer-logo"]}>
        <NavigationLogo></NavigationLogo>
      </div>
    </footer>
  );
};

export default Footer;
