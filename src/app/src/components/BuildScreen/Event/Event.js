import React from "react";

// Styles
import style from "./Event.module.css";

// Components
import EventIcon from "./EventIcon";

const Event = (props) => {
  return (
    <div className={style.container}>
      <div className={style.event}>
        <h6>SMS Notification</h6>
        <span>0+30m</span>
        <div className={style.edit}>
          <EventIcon fill="ffffff" />
        </div>
        <div>
          <span>red</span>
          <span>green</span>
          <span>blue</span>
        </div>
      </div>
    </div>
  );
};

export default Event;
