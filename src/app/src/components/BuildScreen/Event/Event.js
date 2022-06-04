import React, { useState, useContext } from "react";
import { useDrag } from "react-dnd";

// Axios
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import DeleteEventIcon from "./DeleteEventIcon";
import EventGroup from "./EventGroups";
import EventEditPopup from "./EventEditPopup/EventEditPopup";
import EventStatus from "./EventStatus";

// Context
import ProjectContext from "../../../context/ProjectContext";

const Event = (props) => {
  //react drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { data: props.event_data },
  }));
  // Popup states
  const [show, setShow] = useState(false);
  // Axios
  const axiosPrivate = useAxiosPrivate();
  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  const [edited, setEdited] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEdited(true);
    props.handleEdit();
  };
  const handleShow = (event) => {
    setShow(true);
  };

  if (props.placedEvent === false) {
    return (
      <div className={style.container} ref={drag}>
        <div
          className={`${
            props.placedEvent ? style.event : style.event_predefined
          }`}
          style={{ background: props.event_data.event_color }}
        >
          <div className={style.text_container}>
            <h3>{props.event_data.event_name}</h3>
            <span>{props.event_data.event_time}</span>
          </div>

          <div className={style.drag_container}>
            <div className={style.drag}>Drag me!</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div
        className={`${
          props.placedEvent ? style.event : style.event_predefined
        }`}
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
              <EventIcon
                onClick={handleShow}
                fill={`${
                  props.isEdited === true
                    ? "7a7a7a"
                    : edited === true
                    ? "7a7a7a"
                    : "ffffff"
                }`}
              />
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
        {props.placedEvent && (
          <div className={style.edit}>
            <DeleteEventIcon
              fill="ffffff"
              onClick={(e) => {
                e.preventDefault();
                props.handleEventDelete(props.event_id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
