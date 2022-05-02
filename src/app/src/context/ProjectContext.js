import { createContext, useState } from "react";

const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState({});

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
