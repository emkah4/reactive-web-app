import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";

// Bootstrap
import {
  Modal,
  Spinner,
  Overlay,
  Card,
  Form,
  ListGroup,
  InputGroup,
  Button,
} from "react-bootstrap";

// Styles
import styles from "./BuildScriptInitial.module.css";

// Custom components
import SliderWithInputFormControl from "../../UI/SliderWithInputFormControl";
import Department from "./Departments/Department";

// Context
import ProjectContext from "../../../context/ProjectContext";

// Constanst
const NEW_PROJECT_URL = "/projects/new_project";

const BuildScriptInitial = (props) => {
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [durationValue, setDurationValue] = useState(120);
  const [durationFinalvalue, setDurationFinalvalue] = useState(120);
  const [newTeam, setNewTeam] = useState("");
  const [listOfDepartments, setListOfDepartments] = useState([]); //object with departments and people
  // For loading modal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  // Context for project
  const { setProject } = useContext(ProjectContext);

  const axiosPrivate = useAxiosPrivate();

  // Setting navigate for navigation to buildscreen
  let navigate = useNavigate();

  function onFinalDurationChange(event) {
    setDurationFinalvalue(event.target.value);
  }

  function onAddNewTeam() {
    if (!newTeam == "") {
      setListOfDepartments((prevListOfDepartments) => {
        return [
          ...prevListOfDepartments,
          {
            group_title: newTeam,
            group_color: "#f5f5f5", // Not needed value, but leave it for some time, untill backend is fixed
            group_members: [],
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

  const nextButtonHandler = async () => {
    const body = {
      project: {
        project_title: exerciseTitle || "Untitled",
        project_length: parseInt(durationFinalvalue),
        project_status: "Not done at all",
        groups: [...listOfDepartments],
      },
    };

    setLoading(true);

    const access_token = localStorage.getItem("access_token");
    try {
      const response = await axiosPrivate.post(
        NEW_PROJECT_URL,
        JSON.stringify(body)
      );

      setTimeout(setLoading(false), 1000);
      setProject(response.data.project);
      localStorage.setItem("loaded_project_id", response.data.project.id);
      props.onNext();
    } catch (error) {
      if (!error.response) {
        console.log("Server down lol");
      } else if (error.response.status === 403) {
        console.log("Unauthorized lol");
      } else if (error.response.status === 422) {
        console.log("Wrong inpyts lol");
      }

      setError(error?.response?.data?.message);
      setIsError(true);
      setTimeout(setLoading(false), 1000);
    }
  };

  return (
    <React.Fragment>
      {/* MODAL */}
      <Modal
        className={styles.loading_modal}
        show={loading}
        backdrop="static"
        size="sm"
        centered
      >
        <Modal.Body className={styles.body}>
          <Spinner animation="border" role="status" />
        </Modal.Body>
      </Modal>

      <Modal
        className={styles.loading_modal}
        show={isError}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            An Error occured
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setIsError(false);
              setError("");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
              <Department key={Math.random()} data={department}></Department>
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
