import React from "react";
import styles from "./EventStatus.module.css";

const EventStatus = (props) => {
  if (props.isEdited) {
    return <div className={styles.status}></div>;
  } else {
    return <div className={styles.status}>UNEDITED</div>;
  }
};

export default EventStatus;
