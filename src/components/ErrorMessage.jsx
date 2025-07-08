import React from "react";

import "./../styles/errorMessage.css";
function ErrorMessage({ message }) {
  return <div id="error_message">{message}</div>;
}

export default ErrorMessage;
