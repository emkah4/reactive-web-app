import React, { useContext } from "react";

import styles from "./About.module.css";

// Importing context
import AuthContext from "../../context/UserContext";

const About = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <h1>ABOUT US</h1>
      <p>
        The Reactive team is just 3 guys with a big dream of not failing PBL and
        becoming the masters of problem solving. Watch us try hard, fail harder
        and after long hours - win the hardest. Out on Netflix on 15th of June.
      </p>
    </div>
  );
};

export default About;
