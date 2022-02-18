import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
  const [starRating, setStarRating] = useState(0);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  useEffect(() => {
    if (!loading) {
      fetch(`${process.env.REACT_APP_API_URL}/podcasts/${id}`)
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

  // checks if the current podcast matches any of the users podcasts
  const myPodcastIds = [];
  useEffect(() => {
    if (currentPodcast.id) {
      fetch(`${process.env.REACT_APP_API_URL}/my-podcasts/${currentUser.user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => {
        if (r.ok) {
          r.json().then((podcasts) => {
            podcasts.map((p) => {
              myPodcastIds.push(p.podcast_id);
            });
            // console.log(myPodcastIds)
            const found = myPodcastIds.includes(currentPodcast.id);
            setSubscribedToThisPodcast(found);
          });
        } else {
          r.json().then((err) => {
            console.log(err);
          });
        }
      });
    }
    //console.log("myPodcastIds is: ", myPodcastIds)
  }, [currentPodcast, loading]);

  // Getting the users rating of this podcast (if a rating exists). merge with useEffect above??
  useEffect(() => {
    if (!loading && currentPodcast.id > 0) {
      fetch(
        `${process.env.REACT_APP_API_URL}/podcast-rating/?user_id=${currentUser.user.id}&podcast_id=${currentPodcast.id}`
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
  }, [loading, currentPodcast]);

  function handleStarRatingClick(e) {
    setStarRating(e);
    console.log(e)
    fetch(`${process.env.REACT_APP_API_URL}/rating`, {
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
          //console.log(rating);
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
          <Col lg={1}></Col>
        <Col xs={12} lg={2}>
          <PodcastDetailInformation
            currentUser={currentUser}
            subscribeButtonEnabled={subscribeButtonEnabled}
            subscribedToThisPodcast={subscribedToThisPodcast}
            currentPodcast={currentPodcast}
            setSubscribedButtonEnabled={setSubscribedButtonEnabled}
            handleStarRatingClick={handleStarRatingClick}
            starRating={starRating}
          />
          <br />
          <br />
          </Col>
          
      <Col xs={1}></Col>


          <Col xs={10} lg={7} id="podcast-main-episode-list">
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
