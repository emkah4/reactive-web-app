import React, { useState, useReducer, useEffect } from "react";

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

function Login() {
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
    /**
   @todo: Implement form submition logic
	**/
  }
  /**
   @todo: Remove button and card placeholders
	**/
  return (
    <div>
      <form onSubmit={onFormSubmitHandler}>
        <div className="">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailOnChangeHandler}
            onBlur={checkEmailValidity}
          ></input>
        </div>
        <div className="">
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordOnChangeHandler}
            onBlur={checkPasswordValidity}
          ></input>
        </div>
        <div className="">
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
        </div>
      </form>
    </div> // Card placeholder
  );
}

export default Login;