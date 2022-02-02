import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Podcasts.css"
import EpisodeDetail from "./EpisodeDetail";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function PodcastDetail({ currentUser }) {
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:3000/podcasts/${id}`)
      .then((r) => r.json())
      .then((podcast) => {
        console.log(podcast);
        setCurrentPodcast(podcast);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=5`
    )
      .then((r) => r.json())
      .then((r) => {
        setPodcastEpisodes(r);
        console.log(r);
      });
  }, []);

  

  function handleSubscribeClick() {
    fetch("http://127.0.0.1:3000/user_subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       Authorization: "Bearer" + currentUser.token,
      },
      body: JSON.stringify({
        user_id: currentUser.user.id,
        podcast_id: currentPodcast.id
      }),
    }).then(r => r.json()).then(r => console.log(r));
  }

  return (
    <div>
      {currentPodcast ? (
        <Row id="podcast-detail-top-row">
          <Col xs={4} id="podcast-main-image">




            <Button onClick={() => navigate(-1)}>&#60; Go Back</Button>




            <img
              src={currentPodcast.artworkUrl600}
              alt={currentPodcast.collectionName}
              width="90%"
              id="podcast-main-image"
            />
            <Row>&nbsp;</Row>
            <Row>
                <Col></Col>
                <Col>

                { currentUser.length > 0 ? <Button onClick={handleSubscribeClick}>Subscribe</Button> : null }
                
             
             </Col>
             <Col></Col>
            </Row>
          </Col>

          <Col xs={8} id="podcast-main-episode-list">
          <h2>{currentPodcast.collectionName}</h2>
            {podcastEpisodes.results
              ? podcastEpisodes.results.slice(1).map((episode) => {
                  
                return( 
                <>
                <Link to={`/episodes/${episode.trackId}`}>

                <EpisodeDetail episode={episode} />

                </Link>
                </>)
                })
              : null}
          </Col>
        </Row>
      ) : <p>Something went wrong.</p>}
    </div>
  );
}

export default PodcastDetail;
