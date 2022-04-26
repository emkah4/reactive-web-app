import React from "react";
import { NavLink } from "react-router-dom";

// Components
import Navigation from "./Navigation";
import NavigationLogo from "./LayoutAssets/NavigationLogo";
import Button from "../UI/Button/Button";

// Styles
import style from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={style.header}>
      <NavLink to="/home">
        <NavigationLogo />
      </NavLink>
      <div className={style.container}>
        <div className={style.navigation}>
          <Navigation className={style.ul} />
        </div>
        <div>
          {!props.isLoggedIn ? (
            <div>
              <NavLink to="/login">
                {/* <Button onClick={props.onLogout}>
              Sign out
            </Button> */}
                <Button>Sign In</Button>
              </NavLink>
              <NavLink to="/register">
                <Button>Register</Button>
              </NavLink>
            </div>
          ) : (
            <NavLink to="/login">
              {/* <Button onClick={props.onLogout}>
              Sign out
            </Button> */}
              <Button>Profile</Button>
              <Button onClick={props.onLogout}>Log Out</Button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
