import React, { useState, useEffect, useContext } from "react";

// Styles

import styles from "./BuildScreen.module.css";
import BuildScriptInitial from "./BuildScriptInitial/BuildScriptInitial";
import BuildScriptMain from "./BuildScriptMain/BuildScriptMain";

// Components
import Event from "./Event/Event";
import EventEditPopup from "./Event/EventEditPopup/EventEditPopup";
import EventEditPopupHeader from "./Event/EventEditPopup/EventEditPopup";

// Context
import ProjectContext from "../../context/ProjectContext";

// Axios
import axios from "../../api/axios";

// Constants
const GET_PROJECT_URL = "/projects/get_project/";

const BuildScreen = (props) => {
  const [initialInfoPassed, setInitialInfoPassed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  // Function for handling setInitialInfoPassed state
  const projectCreated = () => {
    setInitialInfoPassed(true);
  };

  // Function for handling loaded projects
  const closeProject = () => {
    localStorage.setItem("loaded_project_id", null);
    setInitialInfoPassed(false);
  };

  useEffect(() => {
    // Getting currently loaded project id
    let project_id;
    project_id = localStorage.getItem("loaded_project_id");

    // Checking if any project is loaded
    if (project_id === "null") {
      // If no project is loaded setting setInitialInfoPassed to false
      setInitialInfoPassed(false);
    } else {
      if (project_id) {
        // If there is a project_id in the local storage, lets reload the project
        const compiled_url = GET_PROJECT_URL + project_id;
        const access_token = localStorage.getItem("access_token");
        const fetchProject = async () => {
          try {
            const response = await axios.get(compiled_url, {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Bearer " + access_token,
              },
            });
            setProject(response.data.project);
            console.log(response.data.project);
            if (project) {
              setInitialInfoPassed(true);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchProject();
      }
    }
  }, [setInitialInfoPassed]);

  useEffect(() => {
    if (!loggedIn) {
      const sessionToken = localStorage.getItem("isLoggedIn");
      if (sessionToken === "1") {
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        {!loggedIn && (
          <div>
            <p>Please log in!</p>
          </div>
        )}
        {!initialInfoPassed && loggedIn && (
          <BuildScriptInitial onNext={projectCreated} />
        )}
        {initialInfoPassed && loggedIn && (
          <BuildScriptMain onClose={closeProject} />
        )}
        {/* <BuildScriptMain {...init_mock}/> */}
      </div>
    </React.Fragment>
  );
};

export default BuildScreen;
