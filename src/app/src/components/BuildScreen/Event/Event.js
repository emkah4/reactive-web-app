import React from "react";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import EventGroup from "./EventGroups";

const Event = (props) => {
  return (
    <div className={style.container} onClick={props.onClick}>
      <div
        className={style.event}
        style={{ background: props.event_data.event_color }}
      >
        <div className={style.text_container}>
          <h6>{props.event_data.event_title}</h6>
          <span>{props.event_data.event_time}</span>
        </div>
        <div className={style.edit}>
          <EventIcon fill="ffffff" />
        </div>
        <div className={style.groups}>
          <EventGroup groups={props.event_data.event_groups}></EventGroup>
        </div>
      </div>
    </div>
  );
};

export default Event;
