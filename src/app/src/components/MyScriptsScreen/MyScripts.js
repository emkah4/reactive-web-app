import React, { useEffect, useState } from "react";

// Axios
import useAxiosPrivate from "../../shared/hooks/useAxiosPrivate";

// Components
import Sctipt from "./Script";

// Styles
import styles from "./MyScripts.module.css";

const MyScripts = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [exportingProject, setExportingProject] = useState(null);

  const exportProject = async (event) => {
    try {
      const response = await axiosPrivate.get(
        `/projects/get_project/${event.target.value}`
      );
      setExportingProject(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editProject = (event) => {
    localStorage.setItem("loaded_project_id", event.target.value);
    window.open("/create_a_script", "_self");
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
        <p>
          No new projects yet. You either need to log in or create a new
          project!
        </p>
      ) : (
        <Sctipt
          projects={loadedProjects}
          export={exportProject}
          edit={editProject}
          delete={deleteProject}
        />
      )}
    </div>
  );
};

export default MyScripts;
