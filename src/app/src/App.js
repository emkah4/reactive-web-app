import React from "react";

// Components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import BuildScreen from "./components/BuildScreen/BuildScreen";
import Login from "./components/Login/Login";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <BuildScreen></BuildScreen>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
