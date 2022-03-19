import React, { useEffect, useState } from "react";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import BuildScreen from "./components/BuildScreen/BuildScreen";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loginHandler(email, password) {
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
    <React.Fragment>
      <Header onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <BuildScreen />}
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
