import React, { useContext } from "react";
import NavigationLogoColor from "../Layout/LayoutAssets/NavigationLogoColor";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";

import styles from "./About.module.css";

// Importing context
import AuthContext from "../../context/UserContext";

const About = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.welcome}>
                  <div className={styles.top_text}>So what is <div className={styles.logo_container}><NavigationLogoColor /></div>?</div>
                  <div className={styles.bottom_text}>Simply put, Reactive let's you create table top exercise scripts to be used in your company/organization</div>
                </div>
                <div>
                    <NavLink to="/home">
                        <Button className='home'>Create a script</Button>
                    </NavLink>
                    <NavLink to="/about">
                        <Button className='home'>About</Button>
                    </NavLink>
                </div>
            </div>
            <div className={styles.right}></div>
        </div>
  );
};

export default About;
