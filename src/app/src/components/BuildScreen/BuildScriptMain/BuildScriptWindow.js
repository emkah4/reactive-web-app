import React, { useEffect, useState } from "react";

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

  console.log(list)
  console.log(dept)

  return <div className={styles.window}>
    <table>
      {dept.reverse().map((depts) => (
        <tr className={styles.row}>
          {depts.map((events) => (
            <td className={styles.event}>{events.id}</td>
          ))}
        </tr>
      ))}
    </table>
  </div>;
};

export default BuildScriptWindow;
