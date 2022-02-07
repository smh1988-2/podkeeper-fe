import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import Duration from "./Duration";
import "./Podcasts.css";

import ReactPlayer from "react-player";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Rating } from "react-simple-star-rating";
import { RiArrowLeftLine } from "react-icons/ri";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

import {
  RiArrowGoForwardFill,
  RiArrowGoBackLine,
  RiPlayFill,
  RiPauseFill,
  RiAddFill,
  RiSubtractFill,
} from "react-icons/ri";

function EpisodeMainPage({ currentUser }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [currentEpisode, setCurrentEpisode] = useState({});
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState();


  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  let [played, setPlayed] = useState(0);
  let [progress, setProgress] = useState(0);
  let [playbackRate, setPlaybackRate] = useState(1);
  let [volume, setVolume] = useState(0.5);
  let [seeking, setSeeking] = useState(false);



  const player = useRef();

  useEffect(() => {
    fetch(`${env.API_URL}/episodes/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setCurrentEpisode(r);
        // console.log(r.id);
        setAudioUrl(r.episodeUrl);
      });
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {setLoading(false)}, 2500);
  })

  function handleStarRatingClick(e) {
    setStarRating(e);

    fetch(`${env.API_URL}/rating`, {
      
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

  function handleMute() {
    setMuted(!muted);
  }

  function handleSpeedChange(e) {
    //console.log(e);
  }

  function handleDuration(duration) {
    setDuration(duration);
  }

  function onProgress(e) {
    //console.log(played)
    //console.log(progress);
    setProgress(e.playedSeconds);
    setPlayed(e.playedSeconds / 6000);
  }

  function handleFaster() {
    setPlaybackRate((playbackRate += 0.25));
  }

  function handleSlower() {
    setPlaybackRate((playbackRate -= 0.25));
  }

  // function handleSeekMouseDown() {
  //   setSeeking(true);
  // }

  // function handleSeekChange(e) {
  //   //console.log(e.target.value);
  //   setPlayed(parseFloat(e.target.value));
  // }

  // function handleSeekMouseUp(e) {
  //   setSeeking(false);
  //   //console.log(e.target.value);
  //   player.current.seekTo(parseFloat(e.target.value));
  //   //setPlayed(e.target.value)
  // }

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
    fetch(`${env.API_URL}/listened`, {
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
      {!currentEpisode && loading ? (
        <>
          <Row>
            <Col></Col>
            <Col className="text-center loading-animation">
              <ScaleLoader color={"#485049"} loading={loading} height={50} size={250} />{" "}
            </Col>
            <Col></Col>
          </Row>
        </>
      ) : null}

      {currentEpisode ? (
        <>
          <Row>
            <Col></Col>

            <Col className="text-center">
              <Row>



              <Button className="back-button-episode-main-page" onClick={() => navigate(-1)}>
              <RiArrowLeftLine /> Back
              </Button>




                <h4 className="subheading">{currentEpisode.collectionName}</h4>
              </Row>
              <Row>
                <h3>{currentEpisode.trackName}</h3>
                <h6 style={{ color: "#c9ceca" }}>
                  <Duration seconds={duration} />
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
                    // onMouseDown={handleSeekMouseDown}
                    // onChange={handleSeekChange}
                    // onMouseUp={handleSeekMouseUp}
                  />
                </Col>
                <Col></Col>
              </Row>
              <Row>&nbsp;</Row>
              <img
                src={currentEpisode.artworkUrl600}
                alt={currentEpisode.trackName}
                height="400px"
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
                  //onSeek={(e) => console.log("onSeek", e)}
                  onEnded={handleEnded}
                />
              </Row>

          {/* Move to new component */}
              <Row id="play-pause-row" className="align-middle">
                <Col></Col>
                <Col>
                  <br />
                  <span style={{ fontSize: "2em", color: "#2E5B4F" }}>
                    <RiArrowGoBackLine onClick={handleBackward} />
                  </span>
                </Col>
                <Col>
                  <span
                    style={{ fontSize: "4em", color: "#2E5B4F" }}
                    id="play-pause-button"
                  >
                    {playing ? (
                      <RiPauseFill onClick={handlePlayPause} />
                    ) : (
                      <RiPlayFill onClick={handlePlayPause} />
                    )}
                  </span>
                </Col>

                <Col>
                  <br />
                  <span style={{ fontSize: "2em", color: "#2E5B4F" }}>
                    <RiArrowGoForwardFill onClick={handleForward} />
                  </span>
                </Col>
                <Col></Col>
              </Row>

              {/* Move to new component */}
              <Row>
                <Col></Col>
                <Col>
                  <span style={{ fontSize: "1em", color: "#2E5B4F" }}>
                    <RiSubtractFill onClick={handleSlower} />
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span>{playbackRate}x</span>
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ fontSize: "1em", color: "#2E5B4F" }}>
                    <RiAddFill onClick={handleFaster} />
                  </span>
                </Col>
                <Col></Col>
                <Rating onClick={handleStarRatingClick} ratingValue={starRating} />

              </Row>
            </Col>

            <Col></Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}

export default EpisodeMainPage;
