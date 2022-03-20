import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login/Login";

import { MyScripts, BuildScreen, About, Home } from "./components"

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
      <Router>
        <Header onLogout={logoutHandler} />
        <Routes>
          <Route path='/create_a_script' element={<BuildScreen />}/>
          <Route path='/my_scripts' element={<MyScripts />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />}/>
        </Routes>

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

