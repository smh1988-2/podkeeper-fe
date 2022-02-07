import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import "./Podcasts.css";
import EpisodeDetail from "./EpisodeDetail";
import SubscriptionButtons from "./SubscriptionButtons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RiArrowLeftLine } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";

function PodcastDetail({ currentUser }) {
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribeButtonEnabled, setSubscribedButtonEnabled] = useState(true); //move to sub button component?
  const [subscribedToThisPodcast, setSubscribedToThisPodcast] = useState(false); //move to sub button component?
  const [starRating, setStarRating] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${env.API_URL}/podcasts/${id}`)
      .then((r) => r.json())
      .then((podcast) => {
        setCurrentPodcast(podcast);
        //console.log(podcast)
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
          const found = arr.includes(currentPodcast.id); // this broken???
          setSubscribedToThisPodcast(found);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }, [currentPodcast]);

  // Getting the users rating of this podcast (if a rating exists). merge with useEffect above??
  useEffect(() => {
    fetch(
      `${env.API_URL}/podcast-rating/?user_id=${currentUser.user.id}&podcast_id=${currentPodcast.id}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setStarRating(res[0].rating); //doesn't work for new podcasts...
        });
      } else {
        res.json().then((err) => {
          console.log(err);
        });
      }
    });
  }, [currentPodcast]);

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
        podcast_id: currentPodcast.id,
        activity_type: "podcast-rating",
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
            <br />
            <br />
            <Rating onClick={handleStarRatingClick} ratingValue={starRating} />
            <br />
            <br />
            <SubscriptionButtons
              currentUser={currentUser}
              subscribeButtonEnabled={subscribeButtonEnabled}
              subscribedToThisPodcast={subscribedToThisPodcast}
              currentPodcast={currentPodcast}
              setSubscribedButtonEnabled={setSubscribedButtonEnabled}
            />
          </Col>
          <Col></Col>

          {/* Move to new component lol */}
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
