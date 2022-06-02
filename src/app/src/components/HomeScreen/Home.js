import React from "react";

import NavigationLogoColor from "../Layout/LayoutAssets/NavigationLogoColor";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";



import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.welcome}>
                    <div className={styles.top_text}>Welcome to <div className={styles.logo_container}><NavigationLogoColor /></div>!</div>
                    <div className={styles.bottom_text}>the most interactive table top script exercise creation tool money can't buy</div>
                </div>
                <div>
                    <NavLink to="/home">
                        <Button className='home'>Create a script</Button>
                    </NavLink>
                    <NavLink to="/about">
                        <Button className='home'>About</Button>
                    </NavLink>
                </div>
            </div>
            <div className={styles.right}></div>
        </div>
    )
}

export default Home;