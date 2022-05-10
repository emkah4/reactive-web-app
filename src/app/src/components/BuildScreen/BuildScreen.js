import React, { useState, useEffect, useContext } from "react";

// Styles

import styles from "./BuildScreen.module.css";
import BuildScriptInitial from "./BuildScriptInitial/BuildScriptInitial";
import BuildScriptMain from "./BuildScriptMain/BuildScriptMain";

// Context
import ProjectContext from "../../context/ProjectContext";
import AuthContext from "../../context/UserContext";

// Axios
import useAxiosPrivate from "../../shared/hooks/useAxiosPrivate";

// Constants
const GET_PROJECT_URL = "/projects/get_project/";

const BuildScreen = (props) => {
  const { auth } = useContext(AuthContext);
  const [initialInfoPassed, setInitialInfoPassed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
        const fetchProject = async () => {
          try {
            const response = await axiosPrivate.get(compiled_url);
            setProject(response.data.project);
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
    if (auth?.accessToken !== undefined) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [auth]);

  if (!props.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div>
          <p>Please log in!</p>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        {!initialInfoPassed && <BuildScriptInitial onNext={projectCreated} />}
        {initialInfoPassed && <BuildScriptMain onClose={closeProject} />}
        {/* <BuildScriptMain {...init_mock}/> */}
      </div>
    </React.Fragment>
  );
};

export default BuildScreen;
