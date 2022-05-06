import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
// Context
import ProjectContext from "../../../context/ProjectContext";
import styles from "./EventContainer.module.css";
import Event from "../Event/Event";
import { PREMADE_EVENTS } from "./PremadeEventData";
import classes from "./BuildScriptTools.module.css";

import axios from "../../../api/axios";
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";

// Constants
const REQUEST_URL = "/events/add_event";

const EventContainer = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);
  // Axios private
  const axiosPrivate = useAxiosPrivate();
  //react dnd drop
  const [eventDropped, setEventDropped] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "event",
    drop: (item) => {
      addEvent(item.data);
      console.log(item.data);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (eventDropped.length !== 0) {
      const body = {
        project_id: project.id,
        event_type: 2,
        event_time: eventDropped[0].event_data.event_time,
        event_text: "null",
        event_groups: [eventDropped[0].event_data.group_id],
      };
      console.log(body);

      const addProject = async () => {
        try {
          const response = await axiosPrivate.post(
            REQUEST_URL,
            JSON.stringify(body)
          );
          const id = Object.values(response.data).join();
          eventDropped[0].event_id = id;
          console.log(eventDropped);
        } catch (error) {
          console.log(error);
        }
      };
      addProject();
    }

    console.log(eventDropped);
  }, [eventDropped]);

  const addEvent = (data) => {
    data.event_data = props.event;
    setEventDropped([data]);
  };

  return (
    <div
      className={styles.event}
      ref={drop}
      style={{ border: isOver && "3px solid rgb(61,64,91)" }}
      key={Math.random()}
    >
      {eventDropped.map((event) => (
        <Event
          event_data={event}
          className={classes.tool}
          key={event.ui_id}
          placedEvent={true}
        ></Event>
      ))}
    </div>
  );
};

export default EventContainer;
