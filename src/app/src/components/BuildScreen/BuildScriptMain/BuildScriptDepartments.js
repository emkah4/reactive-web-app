import React from 'react'

import styles from './BuildScriptDepartments.module.css'

const BuildScriptDepartments = (props) => {
  console.log(props.dept_data);
  return (
    <div className={styles.departments}>
      {props.dept_data.map((dept) => (
        <div className={styles.department} key={dept.dept_id}>{dept.dept_name}<br/> {
          dept.dept_people.map((person) => (
            <p className={styles.person}>{person}</p>
          ))
        }</div>
      ))}
    </div>
  );
};

export default BuildScriptDepartments