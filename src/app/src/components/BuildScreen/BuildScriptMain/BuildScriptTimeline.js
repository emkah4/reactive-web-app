import React from 'react'

import styles from "./BuildScriptTimeline.module.css"

const BuildScriptTimeline = (props) => {  

  const sections = props.deptArray[0];
  console.log(sections)

  return (
    <div className={styles.timeline_container}>
      {sections.map((x) => (
        <div className={styles.section}>15min</div>
      ))}
    </div>
  );
}

export default BuildScriptTimeline