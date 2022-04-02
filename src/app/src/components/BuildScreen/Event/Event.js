import React from "react";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";
import EventGroup from "./EventGroups";

const Event = (props) => {
  const eventGroups = [
    {
      id: "g1",
      gropup_name: "Managers",
      group_color: "#f5a911",
      is_included: false,
    },
    {
      id: "g2",
      gropup_name: "Developers",
      group_color: "#e60ba4",
      is_included: true,
    },
    {
      id: "g3",
      gropup_name: "Managers",
      group_color: "#1fe61c",
      is_included: true,
    },
  ];

  return (
    <div className={style.container} onClick={props.onClick}>
      <div className={style.event}>
        <div className={style.text_container}>
          <h6>SMS Notification</h6>
          <span>0+30m</span>
        </div>
        <div className={style.edit}>
          <EventIcon fill="ffffff" />
        </div>
        <div className={style.groups}>
          <EventGroup groups={eventGroups}></EventGroup>
        </div>
      </div>
    </div>
  );
};

export default Event;
