import React from "react";
import Routes from "./routes";
import Navbar from "./components/Navbar";
import NavbarSearch from "./components/NavbarSearch";
import Footer from "./components/Footer";

const App = () => {
    return (
      <div>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    );
  }

export default App;
