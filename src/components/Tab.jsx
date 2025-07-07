import React from "react";

import "./../styles/tab.css";
import { useNavigate, useParams } from "react-router-dom";
function Tab() {
  const navigate = useNavigate();
  const { tab } = useParams();
  const handleClickVideos = () => {
    navigate("/videos");
  };

  const handleClickPhotos = () => {
    navigate("/photos");
  };
  return (
    <div id="tab">
      <div className="tab_item btn" onClick={handleClickVideos}>
        <span className={`tab_name ${tab === "videos" ? "selected" : ""}`}>
          videos
        </span>
        <span
          className={`indicator ${tab === "videos" ? "" : "hidden"}`}
        ></span>
      </div>
      <div className="tab_item btn" onClick={handleClickPhotos}>
        <span className={`tab_name ${tab === "photos" ? "selected" : ""}`}>
          photos
        </span>
        <span
          className={`indicator ${tab === "photos" ? "" : "hidden"}`}
        ></span>
      </div>
    </div>
  );
}

export default Tab;
