import React, { useEffect, useState } from "react";

// Bootstrap
import { ListGroup, Badge, Button } from "react-bootstrap";

// Axios
import axios from "../../api/axios";
import useAxiosPrivate from "../../shared/hooks/useAxiosPrivate";
// Hooks
import { useHttpClient } from "../../shared/hooks/http-hook";

// Components
import Sctipt from "./Script";

// Styles
import styles from "./MyScripts.module.css";
import { Controller } from "react-hook-form";

const MyScripts = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [exportingProject, setExportingProject] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const exportProject = async (event) => {
    try {
      // const responseData = await sendRequest(
      //   `http://193.219.91.103:15411/api/projects/get_project/${event.target.value}`,
      //   "GET",
      //   null,
      //   { Authorization: "Bearer " + access_token }
      // );

      const response = await axiosPrivate.get(
        `/projects/get_project/${event.target.value}`
      );
      setExportingProject(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    console.log(`Here ${exportingProject}`);
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

  return (
    <div className={styles.container}>
      <h1>My scripts</h1>
      {loadedProjects.length === 0 ? (
        <p>No new projects yet. Please log in first!</p>
      ) : (
        <Sctipt projects={loadedProjects} export={exportProject} />
      )}
    </div>
  );
};

export default MyScripts;
