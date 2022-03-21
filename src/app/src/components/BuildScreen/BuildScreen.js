import React from "react";

import styles from "./BuildScreen.module.css";
// import BuildTools from "./BuildTools";
// import BuildWindow from "./BuildWindow";

// Components
import Event from "./Event/Event";

const BuildScreen = (props) => {
  return (
    <div className={styles.container}>
      <Event></Event>
    </div>
  );
};

export default BuildScreen;
