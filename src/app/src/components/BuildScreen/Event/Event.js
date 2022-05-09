import React, { useState } from "react";
import { useDrag } from "react-dnd";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import EventGroup from "./EventGroups";
import EventEditPopup from "./EventEditPopup/EventEditPopup";

const Event = (props) => {
  //react drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { data: props.event_data },
  }));
  // Popup states
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (event) => {
    setShow(true);
  };

  return (
    <div className={style.container} ref={drag}>
      <div
        className={style.event}
        style={{ background: props.event_data.event_color }}
      >
        <div className={style.text_container}>
          <h3>{props.event_data.event_name}</h3>
          <span>{props.event_data.event_time}</span>
        </div>

        <div className={style.edit}>
          {props.placedEvent && (
            <EventIcon onClick={handleShow} fill="ffffff" />
          )}
        </div>

        {show && (
          <EventEditPopup
            title={props.event_data.event_name}
            show={show}
            onClose={handleClose}
            length={props.event_data.event_time}
            event_id={props.event_id}
          />
        )}
        {/* <div className={style.groups}>
          <EventGroup groups={props.event_data.event_groups}></EventGroup>
        </div> */}
      </div>
    </div>
  );
};

export default Event;
