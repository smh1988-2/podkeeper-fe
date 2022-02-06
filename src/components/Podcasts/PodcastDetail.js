import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import "./Podcasts.css";
import EpisodeDetail from "./EpisodeDetail";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RiArrowLeftLine } from "react-icons/ri";

function PodcastDetail({ currentUser }) {
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribeButtonEnabled, setSubscribedButtonEnabled] = useState(true);
  const [subscribedToThisPodcast, setSubscribedToThisPodcast] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${env.API_URL}/podcasts/${id}`)
      .then((r) => r.json())
      .then((podcast) => {
        setCurrentPodcast(podcast);
      });
  }, [loading]);

  useEffect(() => {
    fetch(
      `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode`
    )
      .then((r) => r.json())
      .then((r) => {
        setPodcastEpisodes(r);
        setLoading(false);
      });
  });

  const arr = [];
  useEffect(() => {
    fetch(`${env.API_URL}/my-podcasts/${currentUser.user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((podcasts) => {
          podcasts.map((p) => {
            arr.push(p.podcast_id);
          });
          const found = arr.includes(currentPodcast.id);
          setSubscribedToThisPodcast(found);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }, [currentPodcast]);

  function handleSubscribeClick() {
    const token = localStorage.getItem("token");
    fetch(`${env.API_URL}/user_subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentUser.user.id,
        podcast_id: currentPodcast.id,
        activity_type: "subscription",
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setSubscribedButtonEnabled(false);
      });
  }

  return (
    <div>
      {currentPodcast ? (
        <Row id="podcast-detail-top-row">
          <Col></Col>
          <Col xs={4} id="podcast-main-image" className="text-center">
            <Button className="back-button" onClick={() => navigate(-1)}>
              <RiArrowLeftLine /> Back
            </Button>
            <br />
            <br />

            <img
              src={currentPodcast.artworkUrl600}
              alt={currentPodcast.collectionName}
              width="60%"
              id="podcast-main-image"
            />
            <Row>&nbsp;</Row>
            <Row>
              <Col></Col>
              <Col>
                {currentUser.user &&
                subscribeButtonEnabled &&
                !subscribedToThisPodcast ? (
                  <Button
                    className="global-button"
                    onClick={handleSubscribeClick}
                  >
                    Subscribe
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="global-button"
                    // change this to handleUnsubscribeClick and enable the button????
                    onClick={handleSubscribeClick}
                  >
                    Subscribed
                  </Button>
                )}
              </Col>
              <Col></Col>
            </Row>
          </Col>
          <Col></Col>

          <Col xs={8} id="podcast-main-episode-list">
            {podcastEpisodes.results
              ? podcastEpisodes.results.slice(1).map((episode) => {
                  return (
                    <>
                      <Link to={`/episodes/${episode.trackId}`}>
                        <EpisodeDetail episode={episode} />
                      </Link>
                    </>
                  );
                })
              : null}
          </Col>
          <Col></Col>
        </Row>
      ) : null}
    </div>
  );
}

export default PodcastDetail;
