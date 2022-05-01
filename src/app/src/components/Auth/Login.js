// React
import React, { useState, useReducer, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../Auth/Login.module.css";

// Bootstrap
import Form from "react-bootstrap/Form";

// Team Reactive
import Card from "../UI/Card";
import Button from "../UI/Button/Button";
import LoginError from "./LoginError";

// Context
import AuthContext from "../../context/UserContext";

// Axios
import axios from "../../api/axios";

// Constants
const LOGIN_URL = "/users/login_user";

// Reducers ---------------------------------------------------------------

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

// Main function ----------------------------------------------------------
const Login = (props) => {
  // Setting navigate for navigation to home
  let navigate = useNavigate();

  // States
  const [formIsValid, setFormValid] = useState();
  const [error, setError] = useState(null);

  // Context for user context
  const { setAuth } = useContext(AuthContext);

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

  // Effect to check if inputs are valid
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormValid(emailIsValid && passwordIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  function emailOnChangeHandler(event) {
    setError(null);
    dispatchEmail({ value: event.target.value, type: "USER_INPUT" });
  }

  function passwordOnChangeHandler(event) {
    setError(null);
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
      email: emailState.value.toLowerCase(),
      password: passwordState.value,
    };

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(body), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      setAuth(response.data);
      props.onLoggingIn();
      navigate("/home");
    } catch (error) {
      if (!error.response) {
        setError("Server is down.");
      } else if (error.response.status === 403) {
        setError(error.response.data.message);
      } else if (error.response.status === 422) {
        setError("Wrong inputs, check requirements");
      }
    }
  };

  return (
    <Card className={styles.login}>
      {error ? (
        <LoginError error={error} />
      ) : (
        <h1 style={{ color: "white" }}>Welcome back!</h1>
      )}
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
};

export default Login;
