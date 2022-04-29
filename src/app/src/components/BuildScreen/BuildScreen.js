import React, { useState } from "react";

// Styles

import styles from "./BuildScreen.module.css";
import BuildScriptInitial from "./BuildScriptInitial/BuildScriptInitial";
import BuildScriptMain from "./BuildScriptMain/BuildScriptMain";

// Components
import Event from "./Event/Event";
import EventEditPopup from "./Event/EventEditPopup/EventEditPopup";
import EventEditPopupHeader from "./Event/EventEditPopup/EventEditPopup";

const BuildScreen = (props) => {
  const [initialInfoPassed, setInitialInfoPassed] = useState(false);
  const [initialInfo, setInitialInfo] = useState({});

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

  const init_mock = {
    exercise_title: "test",
    list_of_departments: [
      {
        dept_id: "dept0.0749763453453",
        dept_name: "Devs",
        dept_people: ["tadas", "letas"],
      },
      {
        dept_id: "dept0.0751134519763",
        dept_name: "Managers",
        dept_people: ["tadas", "letas"],
      },
      {
        dept_id: "dept0.074976573219763",
        dept_name: "1XDXDXDXD",
        dept_people: ["tadas", "letas"],
      },
    ],
    duration: "240",
  };

  const passInitialInfo = (
    exerciseTitle,
    listOfDepartments,
    durationFinalvalue
  ) => {
    setInitialInfo(() => {
      return {
        exercise_title: exerciseTitle,
        list_of_departments: listOfDepartments,
        duration: durationFinalvalue,
      };
    });
    setInitialInfoPassed(true);
  };

  console.log(initialInfo);

  return (
    <React.Fragment>
      <div className={styles.container}>
        {!initialInfoPassed && <BuildScriptInitial onNext={passInitialInfo} />}
        {initialInfoPassed && <BuildScriptMain {...initialInfo} />}
        {/* <BuildScriptMain {...init_mock}/> */}
      </div>
    </React.Fragment>
  );
};

export default BuildScreen;
