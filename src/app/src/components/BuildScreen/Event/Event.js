import React, { useState } from "react";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import EventGroup from "./EventGroups";
import EventEditPopup from "./EventEditPopup/EventEditPopup";

const Event = (props) => {
  // Popup states
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    console.log("Close");
  };
  const handleShow = (event) => {
    setShow(true);
    console.log("Show");
  };

  return (
    <div className={style.container}>
      <div
        className={style.event}
        style={{ background: props.event_data.event_color }}
      >
        <div className={style.text_container}>
          <h3>{props.event_data.event_title}</h3>
          <span>{props.event_data.event_time}</span>
        </div>
        <div className={style.edit}>
          <EventIcon onClick={handleShow} fill="ffffff" />
        </div>
        {show && (
          <EventEditPopup
            title={props.event_data.event_title}
            show={show}
            onClose={handleClose}
            length={props.event_data.event_time}
          />
        )}
        <div className={style.groups}>
          <EventGroup groups={props.event_data.event_groups}></EventGroup>
        </div>
      </div>
    </div>
  );
};

export default Event;
