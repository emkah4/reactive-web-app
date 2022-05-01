import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import styles from "./App.module.css";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/User/Profile";

// Other

import { MyScripts, BuildScreen, About, Home } from "./components";
import { useHttpClient } from "./shared/hooks/http-hook";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function loggedIn() {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  const logoutHandler = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const responseData = await sendRequest(
        "http://193.219.91.103:15411/api/users/logout_user",
        "DELETE",
        "",
        { Authorization: "Bearer " + access_token }
      );
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem("isLoggedIn");
    if (sessionToken === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Header onLogout={logoutHandler} isLoggedIn={isLoggedIn} />
      <div className={styles.main}>
        <Routes>
          <Route path="/create_a_script" element={<BuildScreen />} />
          <Route path="/my_scripts" element={<MyScripts />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoggingIn={loggedIn} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
