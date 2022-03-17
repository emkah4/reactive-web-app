import React from "react";

import styles from "./BuildScreen.module.css";
import BuildTools from "./BuildTools";
import BuildWindow from "./BuildWindow";

const BuildScreen = (props) => {
    return (
        <div className={styles.container}>
            <BuildTools></BuildTools>
            <BuildWindow></BuildWindow>
            <BuildTools></BuildTools>
        </div>
    )
}

export default BuildScreen;