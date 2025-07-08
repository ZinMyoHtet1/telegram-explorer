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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleLoadMore = (lastIndex, type) => {
    validateUrl(telegramLink)
      .then((validTelegram) => {
        setLoadingMore(true);

        fetch(
          `https://telegram-explorer.onrender.com/api/loadMore?url=${validTelegram}&lastIndex=${lastIndex}&type=${type.toLowerCase()}`
        )
          .then((res) => {
            console.log(res, "response");
            return res.json();
          })
          .then((data) => {
            console.log(data.data, "load more data");
            if (data.data.videos) {
              setContents((prev) => {
                return {
                  ...prev,
                  videos: [...prev.videos, ...data.data.videos],
                  lastVideoIndex: data.data.lastVideoIndex,
                };
              });
            } else if (data.data.photos) {
              setContents((prev) => {
                return {
                  ...prev,
                  photos: [...prev.photos, ...data.data.photos],
                  lastPhotoIndex: data.data.lastPhotoIndex,
                };
              });
            }
            setLoadingMore(false);
          })
          .catch((err) => {
            // console.error("Error fetching Telegram videos:", err);
            setError(err.message);
            setLoadingMore(false);
          });
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    if (!telegramLink) {
      navigate("/videos");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (telegramLink) {
      setContents(null);
      validateUrl(telegramLink)
        .then((validTelegram) => {
          setError(null);
          setLoading(true);
          //https://telegram-explorer.onrender.com/api/telegram
          fetch(
            `https://telegram-explorer.onrender.com/api/telegram?url=${validTelegram}`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.data?.videos.length || data.data?.photos.length) {
                setContents(data.data);
              } else {
                setError("This telegram link is private channel or not found.");
              }
              setLoading(false);
            })
            .catch((err) => {
              // console.error("Error fetching Telegram videos:", err);
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
          {tab === "videos" && contents?.videos.length > 0 && (
            <VideoContainer videos={contents.videos}>
              {loadingMore ? (
                <p className="loading_text">loading...</p>
              ) : (
                contents.lastVideoIndex && (
                  <button
                    className="load_more_btn btn"
                    onClick={() =>
                      handleLoadMore(contents.lastVideoIndex, "video")
                    }
                  >
                    load more
                  </button>
                )
              )}
            </VideoContainer>
          )}
          {tab === "photos" && contents?.photos?.length > 0 && (
            <PhotoContainer photos={contents.photos}>
              {loadingMore ? (
                <p className="loading_text">loading...</p>
              ) : (
                contents.lastPhotoIndex && (
                  <button
                    className="load_more_btn btn"
                    onClick={() =>
                      handleLoadMore(contents.lastPhotoIndex, "photo")
                    }
                  >
                    load more
                  </button>
                )
              )}
            </PhotoContainer>
          )}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
      <span id="developed_by">@jys72025</span>
      {media && <Media media={media} />}
    </MediaProvider>
  );
}

export default Home;
