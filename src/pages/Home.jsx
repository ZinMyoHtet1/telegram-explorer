import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { MediaProvider } from "../contexts/mediaContext";
import VideoContainer from "../containers/VideoContainer";
import PhotoContainer from "../containers/PhotoContainer";
import Navbar from "../containers/Navbar";
import Media from "./Media";
// import fetchTelegramURL from "../utils/fetchTelegramURL";

import "./../styles/home.css";
function Home() {
  const [telegramLink, setTelegramLink] = useState(null);
  const [contents, setContents] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { tab } = useParams();

  useEffect(() => {
    if (contents) {
      navigate("/videos");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  useEffect(() => {
    if (telegramLink) {
      setLoading(true);
      setContents(null);
      fetch(
        `https://telegram-explorer.onrender.com/api/telegram?url=${telegramLink}`
      )
        .then((res) => res.json())
        .then((data) => {
          setContents(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching Telegram videos:", err);
        });
    }
  }, [telegramLink]);
  return (
    <MediaProvider value={{ setMedia }}>
      <div id="home_page" className="page">
        <div className="wrapper">
          <h2>Telegram Explorer</h2>
          <Navbar setTelegramLink={setTelegramLink} />
          {loading && <p className="loading_text">loading...</p>}
          {tab === "videos" && contents?.videos.length > 0 && (
            <VideoContainer videos={contents.videos} />
          )}
          {tab === "photos" && contents?.photos?.length > 0 && (
            <PhotoContainer photos={contents.photos} />
          )}
        </div>
      </div>
      {media && <Media media={media} />}
    </MediaProvider>
  );
}

export default Home;
