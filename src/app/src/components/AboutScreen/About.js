import React, { useContext } from "react";

import styles from "./About.module.css";

// Importing context
import { UserContext } from "../../context/UserContext";

const About = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className={styles.container}>
      <h1>ABOUT</h1>
      <p>
        Est adipisicing ad ut quis. Consectetur est esse labore id ullamco est
        elit ex adipisicing veniam adipisicing velit ullamco sint. Sit eu
        exercitation deserunt deserunt. Anim in sint cillum magna amet
        consectetur cillum fugiat enim sit culpa nisi. Duis sit laboris
        incididunt tempor culpa dolore aute in ea reprehenderit ullamco.
      </p>
      <pre>{localStorage.getItem("access_token")}</pre>
    </div>
  );
};

export default About;
