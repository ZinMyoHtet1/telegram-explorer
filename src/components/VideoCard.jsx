import React, { useContext } from "react";
import { mediaContext } from "../contexts/mediaContext";

import PlayVideoIcon from "./../svgs/PlayVideoIcon";

import "./../styles/videoCard.css";
function VideoCard({ video, ...rest }) {
  const { setMedia } = useContext(mediaContext);

  const handlePlayVideo = (video) => {
    console.log("click play");
    const media = { src: video.src, type: "video" };
    setMedia(media);
  };
  return (
    <div className="video_card content_item" {...rest}>
      <img
        src={video.thumbnail}
        alt="thumbnail"
        className="btn"
        onClick={() => handlePlayVideo(video)}
      />
      <span className="duration">{video.duration}</span>
      <PlayVideoIcon
        className="play_video_icon btn"
        fill="#fff"
        width="24"
        height="24"
        onClick={() => handlePlayVideo(video)}
      />
    </div>
  );
}

export default VideoCard;
