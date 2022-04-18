import React, { useState } from "react";

//Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";

// Custom components
import SliderWithInputFormControl from "../../UI/SliderWithInputFormControl";
// Styles
import styles from "./BuildScriptInitial.module.css";
import AddPeoplePopup from "./Departments/AddPeoplePopup/AddPeoplePopup";
import Department from "./Departments/Department";

const BuildScriptInitial = (props) => {
  const [exerciseTitle, setExerciseTitle] = useState("");

  const [durationValue, setDurationValue] = useState(120);
  const [durationFinalvalue, setDurationFinalvalue] = useState(120);

  const [newTeam, setNewTeam] = useState("");
  const [listOfDepartments, setListOfDepartments] = useState([]); //object with departments and people

  function onDurationChange(event) {
    setDurationValue(event.target.value);
  }

  function onFinalDurationChange(event) {
    setDurationFinalvalue(event.target.value);
  }

  function onAddNewTeam(event) {
    setListOfDepartments((prevListOfDepartments) => {
      return [
        ...prevListOfDepartments,
        {
          dept_id: "dept" + Math.random().toString(),
          dept_name: newTeam,
          dept_people: [],
        },
      ];
    });

    setNewTeam("");
  }

  const nextButtonHandler = () => {
    props.onNext(exerciseTitle, listOfDepartments, durationFinalvalue);
  };

  return (
    <React.Fragment>
      <Card border="primary" className="text-center" style={{ width: "86%" }}>
        <Card.Header as="h2">Initial build screen</Card.Header>
        <Card.Body>
          <Card.Title>
            Please fill out these initial settings before proceeding to the
            script builder.
          </Card.Title>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ textAlign: "left" }} as="h6">
                Enter the exercise title:
              </Form.Label>
              <Form.Control
                placeholder="DDoS attack"
                onChange={(e) => setExerciseTitle(e.target.value)}
              />
            </Form.Group>

            <SliderWithInputFormControl
              durationValue={durationValue}
              onDurationChange={onDurationChange}
              onFinalDurationChange={onFinalDurationChange}
            >
              In minutes, select the duration of the exercise
            </SliderWithInputFormControl>
          </Form>
          <br></br>
          <ListGroup style={{ width: "50%" }}>
            <Form.Label as="h6">Participating groups</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Group's name"
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
              />
              <Button
                variant="outline-success"
                id="button-addon2"
                onClick={onAddNewTeam}
              >
                Add a new group
              </Button>
            </InputGroup>
            {listOfDepartments.map((department) => (
              <ListGroup.Item>
                <Department data={department}></Department>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {/* <Button variant="danger">Cancel</Button> */}
            <Button variant="primary" onClick={nextButtonHandler}>
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default BuildScriptInitial;
