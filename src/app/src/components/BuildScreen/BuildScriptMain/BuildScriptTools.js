import React, { useEffect, useState } from "react";
import Event from "../Event/Event";

import styles from "./BuildScriptTools.module.css";
import { PREMADE_EVENTS } from "./PremadeEventData";

// Axios
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";

// Constants
const GET_EVENT_TYPES_URL = "/events/get_event_types";

const BuildScriptTools = (props) => {
  // Axios private
  const axiosPrivate = useAxiosPrivate();
  const [premadeEvents, setPremadeEvents] = useState(null);

  useEffect(() => {
    const fetchPremadeEvents = async () => {
      try {
        const response = await axiosPrivate.get(GET_EVENT_TYPES_URL);
        if (response?.data?.eventTypes.length > 0) {
          setPremadeEvents(response.data.eventTypes);
        }
      } catch (error) {
        console.log(error);
        setPremadeEvents(PREMADE_EVENTS);
      }
    };
    fetchPremadeEvents();
  }, []);

  if (!premadeEvents) {
    return <div></div>;
  }

  return (
    <div className={styles.toolbox}>
      <div className={styles.tools_container}>
        {premadeEvents.map((event_data) => (
          <div className={styles.tool_container} key={event_data.id}>
            <Event
              event_data={event_data}
              className={styles.tool}
              dragEnabled={true}
              placedEvent={false}
              handleEventDelete={props.handleEventDelete}
            ></Event>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildScriptTools;
