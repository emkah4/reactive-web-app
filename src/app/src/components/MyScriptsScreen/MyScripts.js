import React, { useEffect, useState, useReducer } from "react";

// Bootstrap
import { Modal, Button, Form, Alert } from "react-bootstrap";

// Axios
import useAxiosPrivate from "../../shared/hooks/useAxiosPrivate";

// Components
import Sctipt from "./Script";

// Styles
import styles from "./MyScripts.module.css";

// Constants
const SHARE_PROJECT_URL = "/projects/share_project";

// Reducers

function emailReducer(prevState, action) {
  if (action.type === "USER_INPUT") {
    if (action.value.length > 1) {
      return {
        value: action.value,
        isValid: action.value.includes("@"),
        started_editing: true,
      };
    } else {
      return {
        value: action.value,
        isValid: action.value.includes("@"),
        started_editing: false,
      };
    }
  }

  if (action.type === "INPUT_LOST_FOCUS") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }

  return { value: "", isValid: false };
}

const MyScripts = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [exportingProject, setExportingProject] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [sharingProjectId, setSharingProjectId] = useState(null);
  const [sharingProjectRecipient, setSharingProjectRecipient] = useReducer(
    emailReducer,
    {
      value: "",
      isValid: null,
      started_editing: false,
    }
  );
  const [shareError, setShareError] = useState(null);

  const exportProject = async (event) => {
    try {
      const response = await axiosPrivate.get(
        `/projects/get_project/${event.target.value}`
      );
      setExportingProject(response.data);
    } catch (err) {}
  };

  const editProject = (event) => {
    localStorage.setItem("loaded_project_id", event.target.value);
    window.open("/create_a_script", "_self");
  };

  const shareProject = (event) => {
    setSharingProjectId(event.target.value);
    setIsSharing(true);
  };

  //@TODO
  const deleteProject = (event) => {
    // Implement a delete project call to the backend
  };

  useEffect(async () => {
    if (exportingProject) {
      const fileName = "project";
      const json = JSON.stringify(exportingProject);
      const blob = new Blob([json], { type: "application/json" });
      const href = await URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [exportingProject]);

  // Get users projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosPrivate.get(`/projects/get_projects`, {
          signal: controller.signal,
        });

        setLoadedProjects(response.data.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, []);

  // Get projects shared to user
  useEffect(() => {
    const fetchSharedProjects = async () => {
      try {
        const response = await axiosPrivate.get(
          `/projects/get_shared_projects`,
          {
            signal: controller.signal,
          }
        );

        setSharedProjects(response.data.projects);
      } catch (err) {}
    };
    fetchSharedProjects();
  }, []);

  // Function for submitting project share
  const shareSubmitHandler = async () => {
    try {
      const body = {
        project_id: sharingProjectId,
        recipient_email: sharingProjectRecipient.value,
      };
      const response = await axiosPrivate.post(
        SHARE_PROJECT_URL,
        JSON.stringify(body)
      );
      if (response.status === 200) {
        setIsSharing(false);
      } else {
        setShareError(response.message);
      }
    } catch (error) {
      setShareError(error.response.data?.message);
    }
  };

  // Function that reads email value
  const sharingProjectRecipientChangeHandler = (event) => {
    setShareError(null);
    setSharingProjectRecipient({
      value: event.target.value,
      type: "USER_INPUT",
    });
  };

  const handleClose = () => {
    setIsSharing(false);
    setSharingProjectRecipient({
      value: "",
      type: "USER_INPUT",
    });
    setShareError(null);
  };
  const handleShow = () => setIsSharing(true);

  return (
    <div className={styles.container}>
      <Modal
        backdrop="static"
        size="lg"
        centered
        className={styles.loading_modal}
        show={isSharing}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Project Sharing By Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <Alert
            key={Math.random()}
            variant={sharingProjectRecipient.isValid ? "" : "danger"}
            className={styles.form_allert}
            show={
              !sharingProjectRecipient.isValid &&
              sharingProjectRecipient.started_editing
            }
          >
            Email is invalid
          </Alert>

          <Alert
            key={Math.random()}
            variant="danger"
            className={styles.form_allert}
            show={shareError !== null}
          >
            {shareError}
          </Alert>
          <p className={styles.form_title}>Enter email of project recipient</p>
          <Form onSubmit={shareSubmitHandler} className={styles.sharing_form}>
            <Form.FloatingLabel label="Share to:">
              <Form.Control
                required
                value={sharingProjectRecipient.value}
                onChange={sharingProjectRecipientChangeHandler}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className={styles.small}>
                Enter email address of project recipient
              </Form.Text>
            </Form.FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={shareSubmitHandler}>
            Share
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className={styles.header}>My scripts</h1>
      {loadedProjects.length === 0 ? (
        <p className={styles.bottom_text}>
          No projects found. Log in or create a new project!
        </p>
      ) : (
        <Sctipt
          projects={loadedProjects}
          export={exportProject}
          edit={editProject}
          share={shareProject}
          delete={deleteProject}
        />
      )}
      {sharedProjects.length !== 0 && (
        <div>
          <h1 className={styles.header}>Shared scripts</h1>
          <Sctipt
            projects={sharedProjects}
            export={exportProject}
            edit={editProject}
          />
        </div>
      )}
    </div>
  );
};

export default MyScripts;
