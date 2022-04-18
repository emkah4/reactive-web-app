import React from 'react';
import Event from '../Event/Event';

import styles from './BuildScriptTools.module.css'

const BuildScriptTools = (props) => {

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
      <div className={styles.toolbox}>
        <div className={styles.tools_container}>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
            <div className={styles.tool_container}><Event event_data={EVENT_MOCK} className={styles.tool}></Event></div>
        </div>
      </div>
    );
}   

export default BuildScriptTools;