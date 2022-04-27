import React, { useEffect, useState } from "react";

// Bootstrap
import { ListGroup, Badge, Button } from "react-bootstrap";

// Hooks
import { useHttpClient } from "../../shared/hooks/http-hook";

// Components
import Sctipt from "./Script";

// Styles
import styles from "./MyScripts.module.css";

const MyScripts = (props) => {
  const [loadedProjects, setLoadedProjects] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          "http://193.219.91.103:15411/api/projects/get_projects",
          "GET",
          null,
          { Authorization: "Bearer " + access_token }
        );
        setLoadedProjects(responseData.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, []);

  return (
    <div className={styles.container}>
      <h1>My scripts</h1>
      {loadedProjects.length === 0 ? (
        <p>No new projects yet.</p>
      ) : (
        <Sctipt projects={loadedProjects} />
      )}
    </div>
  );
};

export default MyScripts;
