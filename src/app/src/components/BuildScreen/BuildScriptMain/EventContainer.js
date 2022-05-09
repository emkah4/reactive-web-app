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
const GET_EVENT_TYPES_URL = "/events/get_event_types";

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

  let found = false;
  let id;
  let data;

  console.log(props.premadeEvents);

  if (props.eventsInProject) {
    console.log(project.events);
    project.events.forEach((event) => {
      if (
        props.event.group_id == event.groups &&
        props.event.event_time == event.event_time
      ) {
        found = true;
        id = event.id;
        console.log(event.event_type);
        console.log(PREMADE_EVENTS[0].event_id);
        PREMADE_EVENTS.forEach((premadeEvent) => {
          if (event.event_type == premadeEvent.event_id) {
            console.log("FOUND");
            data = premadeEvent;
          }
        });
      }
    });
  }

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
      {found && (
        <Event
          event_data={data}
          className={classes.tool}
          placedEvent={true}
          event_id={id}
        ></Event>
      )}
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
