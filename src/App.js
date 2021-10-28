import React from "react";
import Routes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="main-content">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
