import { React, useState } from "react";
import { Offcanvas, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";

const PasswordResetModal = (props) => {
  const FORGOT_PASSWORD_URL = "/users/forgotPassword";
  const CONFIRM_ANSWER_URL = "/users/confirmAnswer";

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

  const onCloseComponent = () => {
    setShowQuestion(false);
    props.handleClose();
    reset({
      security_answer: "",
      email: "",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      security_answer: "",
      password: "",
    },
  });
  return (
    <>
      <Offcanvas show={props.show} onHide={onCloseComponent}>
        {error ? <Alert variant="danger">{errorMessage}</Alert> : <></>}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Forgot your password?</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {showQuestion ? (
            <Form
              onSubmit={handleSubmit(async (data) => {
                data.email = data.email.toLowerCase();
                data.security_answer = data.security_answer.toLowerCase();
                try {
                  const response = await axios.post(
                    CONFIRM_ANSWER_URL,
                    JSON.stringify(data)
                  );
                  if (response.status === 200) {
                    console.log("Good");
                    handleCloseError();
                    window.location.reload(false);
                  }
                } catch (error) {
                  handleSetError(error.response.data.message);
                  throw error;
                }
              })}
            >
              <Form.Group className="mb-3" controlId="fomrSecQuestion">
                <Form.Label>{secQuestion}</Form.Label>
                <FloatingLabel
                  controlId="floatingAnswer"
                  label="Enter your answer here"
                >
                  <Form.Control
                    type="text"
                    placeholder="Answer"
                    {...register("security_answer", {
                      required: "This is a required field",
                    })}
                  />
                  <p>{errors.email?.message}</p>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingNewPassword"
                  label="New password"
                >
                  <Form.Control
                    type="password"
                    placeholder="New Password"
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
              <Button type="submit">Check answer</Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  reset({
                    security_answer: "",
                    email: "",
                  });
                  onCloseComponent();
                }}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <Form
              onSubmit={handleSubmit(async (data) => {
                data.email = data.email.toLowerCase();
                try {
                  const response = await axios.post(
                    FORGOT_PASSWORD_URL,
                    JSON.stringify(data)
                  );
                  if (response.status === 200) {
                    let security_id = response?.data?.security_question_id;
                    console.log(security_id);
                    handleCloseError();
                    handleShowQuestion(security_id);
                  }
                } catch (error) {
                  console.log(error.message);
                  handleSetError(error.response.data.message);
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
          Don't worry, you can reset your password by providing your email and
          answer the security question!
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PasswordResetModal;
