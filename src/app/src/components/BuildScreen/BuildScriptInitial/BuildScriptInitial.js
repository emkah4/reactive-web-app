import React, { useState } from "react";
import { useForm } from "react-hook-form";

//Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";

// Custom components
import SliderWithInputFormControl from "../../UI/SliderWithInputFormControl";
import Department from "./Departments/Department";
import LoginError from "../../Auth/LoginError";

const BuildScriptInitial = (props) => {
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [formError, setFormError] = useState("");

  const [durationValue, setDurationValue] = useState(120);
  const [durationFinalvalue, setDurationFinalvalue] = useState(120);

  const [newTeam, setNewTeam] = useState("");
  const [listOfDepartments, setListOfDepartments] = useState([]); //object with departments and people

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onFinalDurationChange(event) {
    setDurationFinalvalue(event.target.value);
  }

  function onAddNewTeam() {
    if (!newTeam == "") {
      setListOfDepartments((prevListOfDepartments) => {
        return [
          ...prevListOfDepartments,
          {
            dept_id: Math.random().toString(),
            dept_name: newTeam,
            dept_people: [],
          },
        ];
      });

      setNewTeam("");
    }
  }

  function handleEnterSubmit(target) {
    if (target.charCode == 13) {
      onAddNewTeam();
    }
  }

  return (
    <React.Fragment>
      <Card border="primary" className="text-center" style={{ width: "86%" }}>
        <Card.Header as="h2">Setup screen</Card.Header>
        {formError && <LoginError error={errors.message} />}
        <Card.Body>
          <Card.Title>
            Please fill out these initial settings before proceeding to the
            script builder
          </Card.Title>

          <Form
            onSubmit={handleSubmit((e) => {
              props.onNext(
                exerciseTitle,
                listOfDepartments,
                durationFinalvalue
              );
            })}
          >
            <Form.Group className="mb-3">
              <Form.Label style={{ textAlign: "left" }} as="h6">
                Enter the exercise title:
              </Form.Label>
              <Form.Control
                placeholder="DDoS attack"
                onChange={(e) => setExerciseTitle(e.target.value)}
                {...register("title", {
                  required: "The title is required to continue!",
                })}
              />
              <p>{errors.title?.message}</p>
            </Form.Group>

            <SliderWithInputFormControl
              durationValue={durationValue}
              onDurationChange={(e) => setDurationValue(e.target.value)}
              onFinalDurationChange={(e) =>
                setDurationFinalvalue(e.target.value)
              }
            >
              In minutes, select the duration of the exercise using the slider.
            </SliderWithInputFormControl>

            <br></br>
            <ListGroup style={{ width: "50%" }}>
              <Form.Label as="h6">Participating groups</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Group's name"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  onKeyPress={handleEnterSubmit}
                />
                <Button
                  variant="outline-success"
                  id="button-addNewTeam"
                  onClick={onAddNewTeam}
                >
                  Add a new group
                </Button>
              </InputGroup>
              {listOfDepartments.map((department) => (
                <Department
                  key={department.dept_id}
                  data={department}
                ></Department>
              ))}
            </ListGroup>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                variant="success"
                type="submit"
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
              >
                Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default BuildScriptInitial;
