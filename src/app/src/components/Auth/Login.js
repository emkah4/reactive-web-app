// React
import React, { useState, useReducer, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";

// Team Reactive
import Card from "../UI/Card";
import Button from "../UI/Button/Button";
import LoginError from "./LoginError";

// Context
import { UserContext } from "../../context/UserContext";

// Hooks
import { useHttpClient } from "../../shared/hooks/http-hook";

// Styles
import styles from "../Auth/Login.module.css";
import { Navigate } from "react-router-dom";

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
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const onFormSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      email: emailState.value,
      password: passwordState.value,
    };

    try {
      const responseData = await sendRequest(
        "http://193.219.91.103:15411/api/users/login_user",
        "POST",
        JSON.stringify(body)
      );
      localStorage.setItem("access_token", responseData.access_token);
      localStorage.setItem("refresh_token", responseData.refresh_token);
      setUser(responseData);
      navigate("/about");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        console.log("Ups, server down");
      }
    }

    props.onLoggingIn();
  };

  return (
    <Card className={styles.login}>
      <LoginError error={error} onClear={clearError} />
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
          <Form.Text className={styles.small}>
            Your email information will not be shared.
          </Form.Text>
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

          <Form.Text className={styles.small}>
            Your password must be 6-20 characters long, may contain letters and
            numbers, and must not contain spaces, special characters, or emojis.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className={styles.checkbox}
            type="checkbox"
            label="Remember me"
          />
        </Form.Group>
        <Button type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
