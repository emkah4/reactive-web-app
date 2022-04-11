import React from 'react'

import styles from "./BuildScriptTimeline.module.css"

const BuildScriptTimeline = (props) => {

  return (
    <div className={styles.timeline}>0h + {props.timeline}h</div>
  )
}

export default BuildScriptTimeline