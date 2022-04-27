import React from "react";

// Styles
import styles from "./LoginError.module.css";

const LoginError = (props) => {
  return (
    <div className={styles.error}>
      <p>{props.error}</p>
    </div>
  );
};

export default LoginError;
