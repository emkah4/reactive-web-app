import React from "react";
import Event from "../Event/Event";

import styles from "./BuildScriptTools.module.css";
import { PREMADE_EVENTS } from "./PremadeEventData";

const BuildScriptTools = (props) => {
  return (
    <div className={styles.toolbox}>
      <div className={styles.tools_container}>
        {PREMADE_EVENTS.map((event_data) => (
          <div className={styles.tool_container} key={event_data.event_id}>
            <Event event_data={event_data} className={styles.tool} dragEnabled={true} placedEvent={false}></Event>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildScriptTools;
