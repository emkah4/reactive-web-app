import React, { useEffect, useState, useMemo, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import styles from "./App.module.css";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/User/Profile";
import { MyScripts, BuildScreen, About, Home } from "./components";

// Hooks
import useRefreshToken from "./shared/hooks/useRefreshToken";
import useAxiosPrivate from "./shared/hooks/useAxiosPrivate";

// Context
import { ProjectProvider } from "./context/ProjectContext";
import AuthContext from "./context/UserContext";

// Axios
import axios from "./api/axios";

// Constants
const TOKEN_URL = "/users/token";

function App() {
  // Context for user context
  const { setAuth } = useContext(AuthContext);
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  function loggedIn() {
    setIsLoggedIn(true);
  }

  const logoutHandler = async () => {
    try {
      console.log("at least trying");
      const response = await axiosPrivate.delete(`/users/logout_user`, {
        signal: controller.signal,
      });
      console.log(response);
      setIsLoggedIn(false);
      setAuth(null);
      localStorage.clear();
    } catch (error) {
      throw error;
    }
  };

  // This use effect gets fresh accessToken on load. And if it cant, it sets isLoggedIn to false
  useEffect(async () => {
    if (!isLoggedIn) {
      try {
        const response = await refresh();
        console.log(`response ==== ${response}`);
        if (response) {
          const accessToken = response;
          setAuth(accessToken);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {}
    }
  }, []);

  return (
    <Router>
      <Header onLogout={logoutHandler} isLoggedIn={isLoggedIn} />
      <div className={styles.main}>
        <ProjectProvider>
          <Routes>
            <Route path="/create_a_script" element={<BuildScreen />} />
            <Route path="/my_scripts" element={<MyScripts />} />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login onLoggingIn={loggedIn} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ProjectProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
