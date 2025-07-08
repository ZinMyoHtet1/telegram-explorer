import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { MediaProvider } from "../contexts/mediaContext";
import VideoContainer from "../containers/VideoContainer";
import PhotoContainer from "../containers/PhotoContainer";
import LoadingSpinner from "./../svgs/LoadingSpinner";
import Navbar from "../containers/Navbar";
import Media from "./Media";
// import fetchTelegramURL from "../utils/fetchTelegramURL";

import "./../styles/home.css";
import validateUrl from "../utils/validateUrl";
import ErrorMessage from "../components/ErrorMessage";
function Home() {
  const [telegramLink, setTelegramLink] = useState(null);
  const [contents, setContents] = useState(null);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      validateUrl(telegramLink)
        .then((validTelegram) => {
          setError(null);
          setLoading(true);
          setContents(null);
          fetch(
            `https://telegram-explorer.onrender.com/api/telegram?url=${validTelegram}`
          )
            .then((res) => {
              console.log(res, "response");
              return res.json();
            })
            .then((data) => {
              if (data.data.videos.length || data.data.photos.length) {
                setContents(data.data);
              } else {
                setError("This telegram link is private channel or not found.");
              }
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching Telegram videos:", err);
              setError(err.message);
              setLoading(false);
            });
        })
        .catch((error) => setError(error.message));
    }
  }, [telegramLink]);
  return (
    <MediaProvider value={{ setMedia }}>
      <div id="home_page" className="page">
        <div className="wrapper">
          <Navbar setTelegramLink={setTelegramLink} />
          {loading && (
            <LoadingSpinner
              width="24"
              height="24"
              fill="gray"
              className="loading_spinner"
            />
          )}
          {error && <ErrorMessage message={error} />}
          {tab === "videos" && contents?.videos.length > 0 && (
            <VideoContainer videos={contents.videos} />
          )}
          {tab === "photos" && contents?.photos?.length > 0 && (
            <PhotoContainer photos={contents.photos} />
          )}
        </div>
      </div>
      <span id="developed_by">@jys72025</span>
      {media && <Media media={media} />}
    </MediaProvider>
  );
}

export default Home;
