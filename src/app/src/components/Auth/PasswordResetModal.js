import { React, useState } from "react";
import { Offcanvas, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";

const PasswordResetModal = (props) => {
  const FORGOT_PASSWORD_URL = "/users/forgotPassword";

  const [showQuestion, setShowQuestion] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const securityQuestions = [
    "",
    "What was the first exam you failed?",
    "What was your childhood nickname?",
    "In what city or town was your first job?",
  ];
  const [secQuestion, setSecQuestion] = useState();

  const handleSetError = (message) => {
    setError(true);
    setErrorMessage(message);
  };

  const handleCloseError = () => {
    setError(false);
    setErrorMessage("");
  };

  const handleShowQuestion = (questionID) => {
    setShowQuestion(true);
    setSecQuestion(securityQuestions[questionID]);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      security_question_id: "",
      security_answer: "",
    },
  });
  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleClose}>
        {error ? <Alert variant="danger">{errorMessage}</Alert> : <></>}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Forgot your password?</Offcanvas.Title>
        </Offcanvas.Header>
        {showQuestion ? (
          <Form>
            <Form.Group className="mb-3" controlId="fomrSecQuestion">
              <Form.Label>{secQuestion}</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        ) : (
          <Form
            onSubmit={handleSubmit(async (data) => {
              data.email = data.email.toLowerCase();
              console.log(data.email);
              try {
                const response = await axios.post(
                  FORGOT_PASSWORD_URL,
                  JSON.stringify(data)
                );
                if (response.status === 200) {
                  const security_id = response?.data?.security_question_id;
                  console.log(security_id);
                  handleCloseError();
                  handleShowQuestion(security_id);
                  // SET STATE TO FOUND AND DISPLAY QUESTION
                  // SET LOGIC FOR WHEN NO SECURITY QUESTION IS PROVIDED
                }
              } catch (error) {
                console.log(error.message);
                handleSetError(error.message);
                throw error;
              }
            })}
          >
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <FloatingLabel
                controlId="floatingEmail"
                label="Enter your email here"
              >
                <Form.Control
                  type="email"
                  placeholder="E-mail address"
                  {...register("email", {
                    required: "This is a required field",
                  })}
                />
                <p>{errors.email?.message}</p>
              </FloatingLabel>
            </Form.Group>
            <Button type="submit">Request a password reset</Button>
          </Form>
        )}

        <Offcanvas.Body as="h4">
          Don't worry, you can reset your password by providing your email and
          answer the security question!
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PasswordResetModal;
