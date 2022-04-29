import React, { useState } from "react";

//Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";

// Custom components
import SliderWithInputFormControl from "../../UI/SliderWithInputFormControl";
import Department from "./Departments/Department";

const BuildScriptInitial = (props) => {
  const [exerciseTitle, setExerciseTitle] = useState("");

  const [durationValue, setDurationValue] = useState(120);
  const [durationFinalvalue, setDurationFinalvalue] = useState(120);

  const [newTeam, setNewTeam] = useState("");
  const [listOfDepartments, setListOfDepartments] = useState([]); //object with departments and people

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

  const nextButtonHandler = () => {
    props.onNext(exerciseTitle, listOfDepartments, durationFinalvalue);
  };

  return (
    <React.Fragment>
      <Card border="primary" className="text-center" style={{ width: "86%" }}>
        <Card.Header as="h2">Setup screen</Card.Header>
        <Card.Body>
          <Card.Title>
            Please fill out these initial settings before proceeding to the
            script builder
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
              onDurationChange={(e) => setDurationValue(e.target.value)}
              onFinalDurationChange={(e) =>
                setDurationFinalvalue(e.target.value)
              }
            >
              In minutes, select the duration of the exercise using the slider.
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
            <Button variant="success" onClick={nextButtonHandler}>
              Continue
            </Button>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default BuildScriptInitial;
