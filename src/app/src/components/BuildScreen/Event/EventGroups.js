import React from "react";

// Styles
import style from "./EventGroups.module.css";

const EventGroup = (props) => {
  return (
    <div className={style.div_container}>
      <ul className={style.container}>
        {props.groups.map((group) => (
          <li key={group.id}>
            <div
              className={style.circle}
              style={{ backgroundColor: group.group_color }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventGroup;
