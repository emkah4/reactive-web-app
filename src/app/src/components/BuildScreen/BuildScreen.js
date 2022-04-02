import React, { useState } from "react";

// Styles

import styles from "./BuildScreen.module.css";

// Components
import Event from "./Event/Event";

const BuildScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const eventClickHandler = (event) => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
    console.log(modalOpen);
  };

  return (
    <div className={styles.container}>
      <Event onClick={eventClickHandler}></Event>
    </div>
  );
};

export default BuildScreen;
