import React, { useContext } from "react";
import NavigationLogoColor from "../Layout/LayoutAssets/NavigationLogoColor";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";

import styles from "./About.module.css";

// Importing context
import AuthContext from "../../context/UserContext";
import emilisPhoto from "../Layout/LayoutAssets/emilis.jpg"
import juliusPhoto from "../Layout/LayoutAssets/julius.jpg"
import deividasPhoto from "../Layout/LayoutAssets/deividas.jpg"
import what from "../Layout/LayoutAssets/problem-min.png"
import who from "../Layout/LayoutAssets/chat-min.png"
import purpose from "../Layout/LayoutAssets/purpose-min.png"

const About = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <section className={styles.question}>
        <div className={styles.left}>
          <div className={styles.welcome}>
            <div className={styles.top_text}>So what is <div className={styles.logo_container}><NavigationLogoColor /></div>?</div>
            <div className={styles.bottom_text}>Simply put, Reactive is web application which let's you interactively create table top exercise scripts for your company/organization</div>
          </div>
        </div>
        <div className={styles.right}><img src={what} className={styles.icon}></img></div>
      </section>
      <section className={`${styles.question} ${styles.right_side}`}>
        <div className={styles.left}><img src={who} className={styles.icon}></img></div>
        <div className={styles.right}>
          <div className={styles.welcome}>
            <div className={styles.top_text}>Who can use <div className={styles.logo_container}><NavigationLogoColor /></div>?</div>
            <div className={styles.bottom_text}>Anyone from anywhere can use Reactive. While our system is aimed toward inner company lessons, the application is completely free and open to every user!</div>
          </div>
        </div>
      </section>
      <section className={styles.question}>
        <div className={styles.left}>
          <div className={styles.welcome}>
            <div className={styles.top_text}>What is the purpose of<div className={styles.logo_container}><NavigationLogoColor /></div>?</div>
            <div className={styles.bottom_text}>We believe that is important clarify roles and responsibilities of different people in a company and make sure said individuals know their part. Reactive helps create the valuable table top exercises in a interactive way</div>
          </div>
        </div>
        <div className={styles.right}><img src={purpose} className={styles.icon}></img></div>
      </section>
      <section className={styles.team}>
        <div className={`${styles.bottom_text} ${styles.title}`}>TEAM REACTIVE</div>
        <div className={styles.team_container}>
          <div className={styles.person}>
            <img src={emilisPhoto}></img>
            <span>Emilis Šerys</span>
            <span className={styles.quote}>„Procrastinate now, don't put it off“</span>
          </div>
          <div className={styles.person}>
            <img src={deividasPhoto}></img>
            <span>Deividas Bendaravičius</span>
            <span className={styles.quote}>„I walk around like everything's fine, but deep down, inside my shoe, my sock is sliding off“</span>
          </div>
          <div className={styles.person}>
            <img src={juliusPhoto}></img>
            <span>Julius Valma</span>
            <span className={styles.quote}>„Gucci gang gucci gang gucci gang gucci gang gucci gang gucci gang“</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
