import React from "react";

import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Card from "../UI/Card";
import Button from "react-bootstrap/Button";

import styles from "./Register.module.css";

function Register() {
  return (
    <Card className={styles.card}>
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formGroupFname">
          <FloatingLabel controlId="floatingFirstname" label="First name">
            <Form.Control type="fname" placeholder="John" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupLname">
          <FloatingLabel controlId="floatingLastname" label="Last name">
            <Form.Control type="lname" placeholder="Wick" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <FloatingLabel controlId="floatingEmail" label="Email">
            <Form.Control type="email" placeholder="placeholder@name.com" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="supersecretpassword" />
          </FloatingLabel>
        </Form.Group>
      </Form>

      <Button className={styles.button} type="submit">
        Register
      </Button>
    </Card>
  );
}

export default Register;
