import React from "react";

import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useHttpClient } from "../../shared/hooks/http-hook";

import Card from "../UI/Card";
import Button from "react-bootstrap/Button";

import styles from "./Register.module.css";

function Register() {
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

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const name = watch("f_name");
  const regexEmail =
    "/^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/";
  return (
    <>
      <h1 className={styles.title}>Welcome to REACTIVE {name}</h1>
      <Card className={styles.card}>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            console.log(data);

            let user_data;
            try {
              const responseData = await sendRequest(
                "http://193.219.91.103:15411/api/users/register_user",
                "POST",
                data
              );

              user_data = await responseData.data;
            } catch (error) {
              throw error;
            }
            console.log(user_data);
            // props.onLogin(emailState.value, passwordState.value);
          })}
        >
          <Form.Group className="mb-3" controlId="formGroupFname">
            <FloatingLabel controlId="floatingFirstname" label="First name">
              <Form.Control
                type="f_name"
                placeholder="John"
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
                placeholder="Wick"
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
                placeholder="placeholder@name.com"
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
                placeholder="supersecretpassword"
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
    </>
  );
}

export default Register;
