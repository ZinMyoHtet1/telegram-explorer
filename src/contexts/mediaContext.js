import React from "react";

const mediaContext = React.createContext(null);
const MediaProvider = mediaContext.Provider;

export { mediaContext, MediaProvider };
