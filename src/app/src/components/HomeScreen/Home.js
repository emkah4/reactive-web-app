import React from "react";

import NavigationLogoColor from "../Layout/LayoutAssets/NavigationLogoColor";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";
import script_image from "../Layout/LayoutAssets/script.png"
import office_image from "../Layout/LayoutAssets/office_animated-min.jpg"



import styles from './Home.module.css'

const Home = (props) => {
    return (
        <div className={styles.container}>
            <section className={styles.greeting}>
                <div className={styles.left}>
                    <div className={styles.welcome}>
                        <div className={styles.top_text}>Welcome to <div className={styles.logo_container}><NavigationLogoColor /></div>!</div>
                        <div className={styles.bottom_text}>the most interactive table top script exercise creation tool money can't buy</div>
                    </div>
                    <div>
                        {!props.isLoggedIn ? (
                            <NavLink to="/login">
                                <Button className='home'>Log in</Button>
                            </NavLink>
                        ) : (
                            <NavLink to="/create_a_script">
                                <Button className='home'>Create a script</Button>
                            </NavLink>
                        )}
                        <NavLink to="/about">
                            <Button className='home'>About</Button>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={office_image}></img>
                    <figcaption>A company that uses Reactive. Looks like they're really successful!</figcaption>
                </div>
            </section>
        </div>
    )
}

export default Home;