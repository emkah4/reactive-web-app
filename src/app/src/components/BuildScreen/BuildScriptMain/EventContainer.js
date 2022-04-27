import React, { useState } from 'react'
import { useDrop } from "react-dnd";
import styles from "./EventContainer.module.css";
import Event from "../Event/Event";
import { PREMADE_EVENTS } from "./PremadeEventData";
import classes from "./BuildScriptTools.module.css";

const EventContainer = () => {
  //react dnd drop
  const [eventDropped, setEventDropped] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "event",
    drop: (item) => addEvent(item.data),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addEvent = (data) => {
    setEventDropped([data]);
  };

  return (
    <div className={styles.event} ref={drop} style={{ border: isOver && "3px solid rgb(61,64,91)" }}>
      {eventDropped.map((event) => (
        <Event event_data={event} className={classes.tool}></Event>
      ))}
    </div>
  );
};

export default EventContainer