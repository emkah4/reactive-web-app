import React, { useState } from "react";
import { useDrag } from "react-dnd";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import EventGroup from "./EventGroups";
import EventEditPopup from "./EventEditPopup/EventEditPopup";
import EventStatus from "./EventStatus";

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
        {!props.placedEvent && (
          <div className={style.drag_container}>
            <div className={style.drag}>Drag me!</div>
          </div>
        )}
        {props.placedEvent && (
          <div>
            <div className={style.edit}>
              <EventIcon onClick={handleShow} fill="ffffff" />
            </div>
            <div className={style.status}>
              {/* <EventGroup groups={props.event_data.event_groups}></EventGroup> */}
              <EventStatus isEdited={props.isEdited}></EventStatus>
            </div>
          </div>
        )}
        {show && (
          <EventEditPopup
            title={props.event_data.event_name}
            show={show}
            onClose={handleClose}
            length={props.event_data.event_time}
            event_id={props.event_id}
          />
        )}
      </div>
    </div>
  );
};

export default Event;
