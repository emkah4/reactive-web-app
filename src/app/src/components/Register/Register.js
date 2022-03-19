import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card";

import styles from "./Register.module.css";

function Register() {
  const [passwordState, setPasswordState] = useState();
  const [emailState, setEmailState] = useState();
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function emailOnChangeHandler(event) {
    setEmailState(event.target.value);
  }

  function passwordOnChangeHandler(event) {
    setPasswordState(event.target.value);
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();
    console.log("Submitted");
  }

  function checkEmailValidity() {
    setEmailValid(emailState.toString().includes("@"));
    console.log(emailValid);
  }

  function checkPasswordValidity() {
    setPasswordValid(passwordState.toString().trim().length > 6);
    console.log(passwordValid);
  }

  return (
    <Card className={styles.register}>
      <form onSubmit={onFormSubmitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState}
            onChange={emailOnChangeHandler}
            onBlur={checkEmailValidity}
          ></input>
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState}
            onChange={passwordOnChangeHandler}
            onBlur={checkPasswordValidity}
          ></input>
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formValid}>
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Register;
