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

  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  const projectCreated = () => {
    setInitialInfoPassed(true);
  };

  useEffect(() => {
    let project_id;
    if (!initialInfoPassed) {
      project_id = localStorage.getItem("loaded_project_id");
    }

    if (project_id) {
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
          console.log(response);
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
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        {!initialInfoPassed && <BuildScriptInitial onNext={projectCreated} />}
        {initialInfoPassed && <BuildScriptMain />}
        {/* <BuildScriptMain {...init_mock}/> */}
      </div>
    </React.Fragment>
  );
};

export default BuildScreen;
