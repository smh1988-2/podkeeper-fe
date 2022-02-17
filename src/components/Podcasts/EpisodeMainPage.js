import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Duration from "./Duration";
import "./Podcasts.css";

import SpeedControls from "./SpeedControls";
import PlayAndSkipControls from "./PlayAndSkipControls";
import Loading from "../Home/Loading";

import ReactPlayer from "react-player";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Rating } from "react-simple-star-rating";
import { RiArrowLeftLine } from "react-icons/ri";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

function EpisodeMainPage({ currentUser }) {
  const { id } = useParams();
  const player = useRef();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [currentEpisode, setCurrentEpisode] = useState({});
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState(0);

  const [audioUrl, setAudioUrl] = useState("");
  const [playing, setPlaying] = useState(false);

  let [played, setPlayed] = useState();
  let [progress, setProgress] = useState();

  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  let [playbackRate, setPlaybackRate] = useState(1);
  let [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!loading) {
      fetch(`${process.env.REACT_APP_API_URL}/episodes/${id}`)
        .then((r) => r.json())
        .then((r) => {
          setCurrentEpisode(r);
          // console.log("current episode is: ",r);
          setAudioUrl(r.episodeUrl);
        });
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    if (!loading && currentEpisode.id > 0) {
      fetch(
        `http://localhost:3000/episode-rating/?user_id=${currentUser.user.id}&episode_id=${currentEpisode.id}`
      ).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            setStarRating(res[0].rating);
            //console.log("current rating is: ",res[0].rating)
          });
        } else {
          res.json().then((err) => {
            console.log(err);
          });
        }
      });
    }
  }, [loading, currentEpisode]);

  function handleStarRatingClick(e) {
    setStarRating(e);

    fetch(`http://localhost:3000/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentUser.user.id,
        podcast_id: currentEpisode.podcast_id,
        episode_id: currentEpisode.id,
        activity_type: "episode-rating",
        rating: e,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((rating) => {
          console.log(rating);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }

  function handlePlayPause() {
    setPlaying(!playing);
  }

  function handleDuration(duration) {
    setDuration(duration);
  }

  function onProgress(e) {
    setProgress(e.playedSeconds);
    setPlayed(e.playedSeconds / 6000);

    localStorage.setItem(
      `${currentEpisode.id}`,
      JSON.stringify({
        user_id: currentUser.user.id,
        episode_id: currentEpisode.id,
        progress: e.playedSeconds,
        played: e.playedSeconds / 6000,
      })
    );
  }

  function handleFaster() {
    setPlaybackRate((playbackRate += 0.25));
  }

  function handleSlower() {
    setPlaybackRate((playbackRate -= 0.25));
  }

  function handleBackward() {
    player.current.seekTo(played - 0.002);
    setProgress(progress);
    setPlayed(played);
    player.current.seekTo(progress - 15);
  }

  function handleForward() {
    player.current.seekTo(played + 0.002);
    setProgress(progress);
    setPlayed(played);
    player.current.seekTo(progress + 15);
  }

  function handleEnded() {
    console.log("ended");
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/listened`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentUser.user.id,
        podcast_id: currentEpisode.podcast_id,
        episode_id: currentEpisode.id,
        activity_type: "listened",
      }),
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
  }

  return (
    <div>
      {currentEpisode && loading === true ? (
        <Loading loading={loading}/> 
      ) : (
        <>
          {currentEpisode ? (
            <>
              <Row className="episode-row">
                <Col></Col>

                <Col className="text-center">
                  <Row>
                    <Button
                      className="back-button-episode-main-page"
                      onClick={() => navigate(-1)}
                    >
                      <RiArrowLeftLine /> Back
                    </Button>

                    <h4 className="subheading">
                      {currentEpisode.collectionName}
                    </h4>
                  </Row>

                  <Row>
                    <h3>{currentEpisode.trackName}</h3>
                    <h6 style={{ color: "#c9ceca" }}>
                      <Duration seconds={duration} />
                      <br />
                      <Rating
                        onClick={handleStarRatingClick}
                        ratingValue={starRating}
                        size={18}
                      />
                    </h6>
                  </Row>

                  <Row>&nbsp;</Row>
                  <Row>
                    <Col>
                      <Duration seconds={progress} />
                    </Col>
                    <Col xs={1}></Col>
                    <Col>
                      <Duration seconds={duration - progress} />
                    </Col>
                  </Row>

                  <Row>
                    <Col></Col>
                    <Col xs={8}>
                      <ProgressBar
                        now={played}
                        min={0}
                        step="any"
                        max={0.999999}
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>&nbsp;</Row>
                  <img
                    src={currentEpisode.artworkUrl600}
                    alt={currentEpisode.trackName}
                    height="400px"
                    className="episode-player-img-top"
                  />
                  <Row>
                    <ReactPlayer
                      ref={player}
                      height={0}
                      url={audioUrl}
                      controls={false}
                      playing={playing}
                      muted={muted}
                      volume={volume}
                      onDuration={handleDuration}
                      onProgress={onProgress}
                      playbackRate={playbackRate}
                      onEnded={handleEnded}
                    />
                  </Row>

                  <PlayAndSkipControls
                    handleBackward={handleBackward}
                    handlePlayPause={handlePlayPause}
                    handleForward={handleForward}
                    playing={playing}
                  />

                  <SpeedControls
                    handleSlower={handleSlower}
                    playbackRate={playbackRate}
                    handleFaster={handleFaster}
                  />
                </Col>

                <Col></Col>
              </Row>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default EpisodeMainPage;
