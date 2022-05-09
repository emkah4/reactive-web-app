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
import EventIDContext from "../../../context/EventIDContext";

// Constants
const REQUEST_URL = "/events/add_event";

const EventContainer = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);
  // Context for event ID
  const { eventID, setEventID } = useContext(EventIDContext);
  // Axios private
  const axiosPrivate = useAxiosPrivate();
  //react dnd drop
  const [eventDropped, setEventDropped] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "event",
    drop: (item) => {
      addEvent(item.data);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (eventDropped.length !== 0) {
      const body = {
        project_id: project.id,
        event_type: eventDropped[0].id,
        event_time: eventDropped[0].event_data.event_time,
        event_text: "null",
        event_groups: [eventDropped[0].event_data.group_id],
      };

      const addProject = async () => {
        try {
          const response = await axiosPrivate.post(
            REQUEST_URL,
            JSON.stringify(body)
          );
          const event_id = Object.values(response.data).join();
          eventDropped.event_id = event_id;
          setEventID((prev) => {
            return [...prev, event_id];
          });
        } catch (error) {
          console.log(error);
        }
      };
      addProject();
    }
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
          event_id={eventDropped.event_id}
        ></Event>
      ))}
    </div>
  );
};

export default EventContainer;
