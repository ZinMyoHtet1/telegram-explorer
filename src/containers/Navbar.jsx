import React from "react";
import Tab from "../components/Tab";

import "./../styles/navbar.css";
import LinkForm from "../components/LinkForm.jsx";
function Navbar({ setTelegramLink }) {
  return (
    <div id="navbar_head">
      <h2>Telegram Explorer</h2>
      <nav id="navbar">
        <LinkForm setTelegramLink={setTelegramLink} />
        <Tab />
      </nav>
    </div>
  );
}

export default Navbar;
