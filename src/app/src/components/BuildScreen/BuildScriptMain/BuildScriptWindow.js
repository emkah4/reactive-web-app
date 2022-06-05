import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import BuildScriptTimeline from "./BuildScriptTimeline";

// Context
import ProjectContext from "../../../context/ProjectContext";

import styles from "./BuildScriptWindow.module.css";

import Event from "../Event/Event";
import EventContainer from "./EventContainer";

// Axios
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
import { render } from "react-dom";

// Constants
const GET_EVENT_TYPES_URL = "/events/get_event_types";
const DELETE_EVENT_URL = "/events/delete_event/";

const BuildScriptWindow = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  // Axios private
  const axiosPrivate = useAxiosPrivate();
  const [premadeEvents, setPremadeEvents] = useState(null);

  // For rerender
  const [render, setRerender] = useState(false);

  // Events
  let events = [];

  // Function that handles event deletion from db and from dom
  const handleEventDelete = async (eventId) => {
    const url = DELETE_EVENT_URL + eventId;
    const response = await axiosPrivate.delete(url);
    const edited_events = project.events.filter((event) => {
      return event.id !== eventId;
    });

    project.events = edited_events;
    rerender();
  };

  const rerender = () => {
    for (let i = 0; i < props.numberOfDepartments; i++) {
      events[i] = [];
      for (let j = 0; j < props.numberOfElements; j++) {
        events[i].push({
          ui_id: j,
          group_id: project.groups[i].group_id,
          event_time: j * 10,
        });
      }
    }

    setRerender(!render);
  };

  // useEffect(() => {
  //   // Not loading need to fix (for now data is coming from front-end)
  //   const fetchPremadeEvents = async () => {
  //     try {
  //       const response = await axiosPrivate.get(GET_EVENT_TYPES_URL);
  //       if (response?.data?.eventTypes.length > 0) {
  //         setPremadeEvents(response.data.eventTypes);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchPremadeEvents();
  // }, []);

  // This for is for getting table of events
  for (let i = 0; i < props.numberOfDepartments; i++) {
    events[i] = [];
    for (let j = 0; j < props.numberOfElements; j++) {
      events[i].push({
        ui_id: j,
        group_id: project.groups[i].group_id,
        event_time: j * 10,
      });
    }
  }

  if (project?.events?.length === 0) {
    return (
      <div className={styles.window}>
        <BuildScriptTimeline
          time={project.project_length}
        ></BuildScriptTimeline>
        <div className={styles.table}>
          {project.groups.reverse().map((group, index) => (
            <div className={styles.row} key={Math.random()}>
              {events[index].map((event) => (
                <div className={styles.event_container} key={Math.random()}>
                  <EventContainer
                    event={event}
                    handleEventDelete={handleEventDelete}
                  ></EventContainer>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.window}>
        <span>{render}</span>
        <BuildScriptTimeline
          time={project.project_length}
        ></BuildScriptTimeline>
        <div className={styles.table}>
          {project.groups.reverse().map((group, index) => (
            <div className={styles.row} key={group.group_id}>
              {events[index].map((event) => (
                <div className={styles.event_container} key={Math.random()}>
                  <EventContainer
                    event={event}
                    eventsInProject={true}
                    premadeEvents={premadeEvents}
                    handleEventDelete={handleEventDelete}
                    rerender={rerender}
                    key={Math.random()}
                  ></EventContainer>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default BuildScriptWindow;
