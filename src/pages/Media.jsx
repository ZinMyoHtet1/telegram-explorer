import React, { useContext } from "react";
import { mediaContext } from "../contexts/mediaContext";

import "./../styles/media.css";
function Media({ media }) {
  const { setMedia } = useContext(mediaContext);
  const handleCloseMedia = () => {
    setMedia(null);
  };
  return (
    <div id="media" className="overlay_page">
      <nav className="media_navbar">
        <button className="close_btn btn" onClick={handleCloseMedia}>
          close
        </button>
      </nav>
      {media.type === "video" && (
        <video controls autoPlay>
          <source type="video/mp4" src={media.src} />
        </video>
      )}
      {media.type === "photo" && (
        <img className="photo" src={media.src} alt="img" />
      )}
    </div>
  );
}

export default Media;
