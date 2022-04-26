import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Context

import { UserContext } from "./context/UserContext";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { MyScripts, BuildScreen, About, Home } from "./components";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  function loggedIn() {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const sessionToken = localStorage.getItem("isLoggedIn");
    if (sessionToken === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Header onLogout={logoutHandler} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/create_a_script" element={<BuildScreen />} />
          <Route path="/my_scripts" element={<MyScripts />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoggingIn={loggedIn} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </Router>
  );
}

export default App;
