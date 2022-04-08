import React from 'react'

import styles from "./BuildScriptTimeline.module.css"

const BuildScriptTimeline = (props) => {

  const timeInMinutes = props.timeline * 60;
  


  return (
    <div className={styles.timeline}>BuildScriptTimeline</div>
  )
}

export default BuildScriptTimeline