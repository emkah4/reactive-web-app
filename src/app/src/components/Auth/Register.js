import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Bootstrap
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Alert, Button } from "react-bootstrap";

// Context
import AuthContext from "../../context/UserContext";

// Axios
import axios from "../../api/axios";

// UI
import Card from "../UI/Card";

// Styles
import styles from "./Register.module.css";

// Constants
const regexEmail =
  "/^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/";
const REGISTER_URL = "/users/register_user";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
    },
  });
  let navigate = useNavigate();
  const name = watch("f_name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(null);

  // Context for user context
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div className={styles.main_container}>
      <h1 className={styles.title}>Welcome to REACTIVE {name}</h1>
      <Alert
        key={Math.random()}
        variant={success ? "success" : error ? "danger" : ""}
        className={styles.form_allert}
      >
        {success ? "Succesfully registered" : error ? errorMessage : ""}
      </Alert>
      <Card className={styles.card}>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            data.email = data.email.toLowerCase();
            try {
              const response = await axios.post(
                REGISTER_URL,
                JSON.stringify(data),
                { withCredentials: true }
              );
              if (response.status === 200) {
                const accessToken = response?.data?.accessToken;
                setAuth({ accessToken });
                props.onLoggingIn();
                setSuccess(true);
                setLoading(false);
              }
              navigate("/home");
            } catch (error) {
              setError(true);
              setErrorMessage(error.response.data.message);
              throw error;
            }
          })}
        >
          <Form.Group className="mb-3" controlId="formGroupFname">
            <FloatingLabel controlId="floatingFirstname" label="First name">
              <Form.Control
                type="f_name"
                placeholder="First Name"
                {...register("f_name", {
                  required: "This is a required field",
                })}
              />
            </FloatingLabel>
            <p>{errors.f_name?.message}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLname">
            <FloatingLabel controlId="floatingLastname" label="Last name">
              <Form.Control
                type="l_name"
                placeholder="Last Name"
                {...register("l_name", {
                  required: "This is a required field",
                })}
              />
              <p>{errors.l_name?.message}</p>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <FloatingLabel controlId="floatingEmail" label="Email">
              <Form.Control
                type="email"
                placeholder="E-mail address"
                {...register("email", {
                  required: "This is a required field",
                  pattern: { regexEmail },
                })}
              />
              <p>{errors.email?.message}</p>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "This is a required field",
                  minLength: {
                    value: 7,
                    message: "The minimum length of a password is 7",
                  },
                  maxLength: {
                    value: 16,
                    message: "The maximum length of a password is 16",
                  },
                })}
              />
              <p>{errors.password?.message}</p>
            </FloatingLabel>
          </Form.Group>
          <Button className={styles.button} type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
