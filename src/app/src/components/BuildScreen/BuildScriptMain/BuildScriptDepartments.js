import React from 'react'

import styles from './BuildScriptDepartments.module.css'

const BuildScriptDepartments = (props) => {
  console.log(props.dept_data);
  return (
    <div className={styles.departments}>
      {props.dept_data.map((dept) => (
        <div className={styles.department} key={dept.id}>{dept.dept_name}|{
          dept.dept_people.map((person) => (
            <span>{person} </span>
          ))
        }</div>
      ))}
    </div>
  );
};

export default BuildScriptDepartments