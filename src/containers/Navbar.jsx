import React from "react";
import Tab from "../components/Tab";
import LinkForm from "../components/linkForm";

import "./../styles/navbar.css";
function Navbar({ setTelegramLink }) {
  return (
    <nav id="navbar">
      <LinkForm setTelegramLink={setTelegramLink} />
      <Tab />
    </nav>
  );
}

export default Navbar;
