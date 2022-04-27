import React from 'react'

import styles from "./BuildScriptTimeline.module.css"

const BuildScriptTimeline = (props) => {  

  const sections = props.deptArray[0];

  return (
    <div className={styles.timeline_container}>
      {sections.map((x) => (
        <div className={styles.section}>10min</div>
      ))}
    </div>
  );
}

export default BuildScriptTimeline
