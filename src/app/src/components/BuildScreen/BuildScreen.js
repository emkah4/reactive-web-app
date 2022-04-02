import React, { useState } from "react";

// Styles

import styles from "./BuildScreen.module.css";

// Components
import Event from "./Event/Event";

const BuildScreen = (props) => {
  const EVENT_MOCK = {
    event_type: "spam_sms",
    event_title: "Spam SMS",
    event_time: "0+30 min",
    event_color: "rgb(67, 67, 255)",
    event_groups: [
      {
        id: "g1",
        gropup_name: "Managers",
        group_color: "#f5a911",
        is_included: false,
      },
      {
        id: "g2",
        gropup_name: "Developers",
        group_color: "#e60ba4",
        is_included: true,
      },
      {
        id: "g3",
        gropup_name: "Managers",
        group_color: "#1fe61c",
        is_included: true,
      },
    ],
  };

  const [modalOpen, setModalOpen] = useState(false);

  const eventClickHandler = (event) => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
    console.log(modalOpen);
  };

  return (
    <div className={styles.container}>
      <Event onClick={eventClickHandler} event_data={EVENT_MOCK}></Event>
    </div>
  );
};

export default BuildScreen;
