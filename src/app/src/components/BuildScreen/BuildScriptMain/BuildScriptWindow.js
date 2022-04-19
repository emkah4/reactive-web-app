import React, { useEffect, useState } from "react";
import BuildScriptTimeline from "./BuildScriptTimeline";

import styles from "./BuildScriptWindow.module.css";
import Event from "../Event/Event";

const BuildScriptWindow = (props) => {

  let list = [];
  let dept = [];

  for (let index = 0; index < props.numberOfElements * props.numberOfDepartments; index++) {
    list[index] =
      {
        id: 'event' + index
      }
  }

  const partIndex = Math.ceil(list.length / props.numberOfDepartments);
  console.log(partIndex)

  for(let index = 0; index < props.numberOfDepartments; index++) {
    dept[index] = list.splice(-partIndex);
  }

  console.log(list);
  console.log(dept);

  const EVENT_MOCK = {
    event_type: "spam_sms",
    event_title: "Spam SMS",
    event_color: "rgb(61, 64, 91)",
    event_groups: [
      {
        id: "g1",
        group_name: "Managers",
        group_color: "#f5a911",
        is_included: false,
      },
      {
        id: "g2",
        group_name: "Developers",
        group_color: "#e60ba4",
        is_included: true,
      },
      {
        id: "g3",
        group_name: "Managers",
        group_color: "#1fe61c",
        is_included: true,
      },
    ],
  }; 

  return (
    <div className={styles.window}>
      <BuildScriptTimeline deptArray={dept}></BuildScriptTimeline>
      <div className={styles.table}>
        {dept.reverse().map((depts) => (
          <div className={styles.row}>
            {depts.map((events) => (
              <div className={styles.event_container}>
                <div className={styles.event}>+</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildScriptWindow;
