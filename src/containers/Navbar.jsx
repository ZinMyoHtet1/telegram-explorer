import React from "react";
import Tab from "../components/Tab";

import "./../styles/navbar.css";
import LinkForm from "../components/LinkForm.jsx";
function Navbar({ setTelegramLink }) {
  return (
    <nav id="navbar">
      <LinkForm setTelegramLink={setTelegramLink} />
      <Tab />
    </nav>
  );
}

export default Navbar;
