import React, { useEffect, useState } from "react";
import BuildScriptTimeline from "./BuildScriptTimeline";

import styles from "./BuildScriptWindow.module.css";

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

  return (
    <div className={styles.window}>
      <BuildScriptTimeline deptArray={dept}></BuildScriptTimeline>
      <div className={styles.table}>
        {dept.reverse().map((depts) => (
          <div className={styles.row}>
            {depts.map((events) => (
              <div className={styles.event_container}>
                <div className={styles.event}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildScriptWindow;
