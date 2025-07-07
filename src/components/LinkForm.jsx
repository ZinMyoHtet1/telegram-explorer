import React, { useRef } from "react";

import "./../styles/linkForm.css";
import SearchIcon from "../svgs/searchIcon";

function LinkForm({ setTelegramLink }) {
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    setTelegramLink(inputRef.current.value);
  };
  return (
    <form id="link_form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="telegram_link_input"
        id="telegram_link_input"
        placeholder="Enter Telegram Link"
        ref={inputRef}
      />

      <button type="submit" className="btn">
        <SearchIcon width="18" height="18" className="searchIcon" />
      </button>
    </form>
  );
}

export default LinkForm;
