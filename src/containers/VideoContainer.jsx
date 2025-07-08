// import React, { useContext } from "react";

import "./../styles/videoContainer.css";
// import { mediaContext } from "../contexts/mediaContext";
import VideoCard from "../components/VideoCard";
function VideoContainer({ videos, children }) {
  return (
    <div id="video_container" style={{ width: "100%" }}>
      <div className="content_grid">
        {videos.map((video, index) => (
          <VideoCard video={video} key={`photo-${index}`} />
        ))}
      </div>
      {children}
      {/* <button className="load_more_btn btn">load more</button> */}
    </div>
  );
}

export default VideoContainer;

{
  /* <div className="content_item" key={`photo${index}`}>
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="btn"
            onClick={() => handlePlayVideo(video)}
          />
          <span className="duration">3:48</span>
        </div> */
}
