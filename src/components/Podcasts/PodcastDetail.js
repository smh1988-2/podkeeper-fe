import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import "./Podcasts.css";
import EpisodeDetail from "./EpisodeDetail";
import PodcastDetailInformation from "./PodcastDetailInformation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  useEffect(() => {
    if (!loading) {
      fetch(`http://localhost:3000/podcasts/${id}`)
        .then((r) => r.json())
        .then((podcast) => {
          setCurrentPodcast(podcast);
        });
    }
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
    if (currentPodcast.user) {
      fetch(`http://localhost:3000/my-podcasts/${currentUser.user.id}`, {
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
    }
  }, [currentPodcast, loading]);

  // Getting the users rating of this podcast (if a rating exists). merge with useEffect above??
  useEffect(() => {
    if (!loading && currentPodcast.length > 0) {
      fetch(
        `http://localhost:3000/podcast-rating/?user_id=${currentUser.user.id}&podcast_id=${currentPodcast.id}`
      ).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            setStarRating(res[0].rating);
          });
        } else {
          res.json().then((err) => {
            console.log(err);
          });
        }
      });
    }
  }, [currentPodcast, loading]);

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
        <Row id="podcast-detail-top-row" >
          <Col xs={1}></Col>
        <Col xs={3}>
          <PodcastDetailInformation
            currentUser={currentUser}
            subscribeButtonEnabled={subscribeButtonEnabled}
            subscribedToThisPodcast={subscribedToThisPodcast}
            currentPodcast={currentPodcast}
            setSubscribedButtonEnabled={setSubscribedButtonEnabled}
            handleStarRatingClick={handleStarRatingClick}
            starRating={starRating}
          />
          </Col>
          
      <Col xs={1}></Col>
          <Col xs={7} id="podcast-main-episode-list">
            {podcastEpisodes.results
              ? podcastEpisodes.results.slice(1).map((episode) => {
                  return (
                    <div key={episode.trackId}>
                      <Link to={`/episodes/${episode.trackId}`}>
                        <EpisodeDetail episode={episode} />
                      </Link>
                    </div>
                  );
                })
              : null}
          </Col>

          <Col xs={1}></Col>
        </Row>
      ) : null}
    </div>
  );
}

export default PodcastDetail;
