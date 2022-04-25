import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Context

import { UserContext } from "./context/UserContext";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login/Login";

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
        </Routes>
      </UserContext.Provider>

      {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <BuildScreen />} */}

      <Footer />
    </Router>
  );
}

export default App;

/* <main>
  {!isLoggedIn && <Login onLogin={loginHandler} />}
  {isLoggedIn && <Header onLogout={logoutHandler} />}
</main>; */
