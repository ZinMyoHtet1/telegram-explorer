import React, { useContext } from "react";

import "./../styles/photoContainer.css";
import { mediaContext } from "../contexts/mediaContext";
function PhotoContainer({ photos }) {
  const { setMedia } = useContext(mediaContext);

  const handlePlayPhoto = (photo) => {
    const media = { src: photo.src, type: "photo" };
    setMedia(media);
  };
  return (
    <div id="photo_container" className="content_grid">
      {photos.map((photo, index) => (
        <div className="content_item" key={index}>
          <div
            className="background_image"
            style={{
              backgroundImage: `url(${photo.src})`,
              objectFit: "contain",
              filter: "blur(2px)",
            }}
          ></div>
          <img
            className="btn"
            src={photo.src}
            alt="thumbnail"
            onClick={() => handlePlayPhoto(photo)}
          />
        </div>
      ))}
    </div>
  );
}

export default PhotoContainer;
