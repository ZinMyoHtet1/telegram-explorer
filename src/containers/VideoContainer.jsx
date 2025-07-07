// import React, { useContext } from "react";

import "./../styles/videoContainer.css";
// import { mediaContext } from "../contexts/mediaContext";
import VideoCard from "../components/VideoCard";
function VideoContainer({ videos }) {
  // const { setMedia } = useContext(mediaContext);

  // const handlePlayVideo = (video) => {
  //   console.log("click play");
  //   const media = { src: video.src, type: "video" };
  //   setMedia(media);
  // };
  return (
    <div id="video_container" className="content_grid">
      {videos.map((video, index) => (
        <VideoCard video={video} key={`photo-${index}`} />
      ))}
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
