// React
import React, { useState, useReducer, useEffect } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";

// Team Reactive
import Card from "../UI/Card";
import Button from "../UI/Button/Button";

// Styles
import styles from "./Login.module.css";

function emailReducer(prevState, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }

  if (action.type === "INPUT_LOST_FOCUS") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }

  return { value: "", isValid: false };
}

function passwordReducer(prevState, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }

  if (action.type === "INPUT_LOST_FOCUS") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }

  return { value: "", isValid: false };
}

function Login(props) {
  const [formIsValid, setFormValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormValid(emailIsValid && passwordIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  function emailOnChangeHandler(event) {
    dispatchEmail({ value: event.target.value, type: "USER_INPUT" });
  }

  function passwordOnChangeHandler(event) {
    dispatchPassword({ value: event.target.value, type: "USER_INPUT" });
  }

  function checkEmailValidity(event) {
    dispatchEmail({ type: "INPUT_LOST_FOCUS" });
  }

  function checkPasswordValidity(event) {
    dispatchPassword({ type: "INPUT_LOST_FOCUS" });
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  }

  return (
    <Card className={styles.login}>
      <Form className={styles.form} onSubmit={onFormSubmitHandler}>
        <Form.Group className="mb-3 $" controlId="email">
          <Form.FloatingLabel label="Email address">
            <Form.Control
              required
              value={emailState.value}
              onChange={emailOnChangeHandler}
              onBlur={checkEmailValidity}
              type="email"
              placeholder="Enter email"
            />
          </Form.FloatingLabel>
          <Form.Text>Your email information will not be shared.</Form.Text>
        </Form.Group>

        <Form.Group className={`mb-3 ${styles.form}`} controlId="password">
          <Form.FloatingLabel label="Enter password">
            <Form.Control
              required
              value={passwordState.value}
              onChange={passwordOnChangeHandler}
              onBlur={checkPasswordValidity}
              type="password"
              placeholder="Password"
            />
          </Form.FloatingLabel>

          <Form.Text>
            Your password must be 6-20 characters long, may contain letters and
            numbers, and must not contain spaces, special characters, or emojis.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button type="submit" disabled={formIsValid}>
          Login
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
