import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
// Context
import styles from "./EventContainer.module.css";
import Event from "../Event/Event";
import { PREMADE_EVENTS } from "./PremadeEventData";
import classes from "./BuildScriptTools.module.css";

import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
import EventIDContext from "../../../context/EventIDContext";
import ProjectContext from "../../../context/ProjectContext";

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

  // For edited

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "event",
    drop: (item) => {
      addEvent(item.data);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // This use effect is adding events to the database when they are dropped onto timeline
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
          const event_id = response.data.event.id;
          eventDropped.event_id = event_id;
          setEventID((prev) => {
            return [...prev, event_id];
          });

          const added_event = response.data.event;
          let prev_project = project;
          prev_project.events = [...prev_project.events, added_event];
          setProject(prev_project);
        } catch (error) {}
      };
      addProject();
    }
  }, [eventDropped]);

  let found = false;
  let id;
  let data;
  let edited = false;

  if (project?.events) {
    project?.events.forEach((event) => {
      if (
        props.event.group_id == event.groups &&
        props.event.event_time == event.event_time
      ) {
        found = true;
        id = event.id;
        PREMADE_EVENTS.forEach((premadeEvent) => {
          if (event.event_type == premadeEvent.event_id) {
            data = premadeEvent;
          }
          // Checking if event was edited before
          if (event.event_text !== "null") {
            edited = true;
          }
        });
      }
    });
  }

  const handleEdit = () => {
    edited = true;
  };

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
          isEdited={edited}
          event_id={id}
          key={Math.random()}
          handleEventDelete={props.handleEventDelete}
          handleEdit={handleEdit}
          dragEnabled={false}
        ></Event>
      )}
      {!found &&
        eventDropped.map((event) => (
          <Event
            event_data={event}
            className={classes.tool}
            key={event.ui_id}
            placedEvent={true}
            event_id={eventDropped.event_id}
            handleEventDelete={props.handleEventDelete}
            handleEdit={handleEdit}
            dragEnabled={false}
          ></Event>
        ))}
    </div>
  );
};

export default EventContainer;
