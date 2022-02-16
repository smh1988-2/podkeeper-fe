import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function EpisodeDetail({ episode }) {

  const token = localStorage.getItem("token");

    function handleSearchResultCardClick(e) {
        // create the episode in the backend
        fetch(`http://localhost:3000/episodes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            collectionName: episode.collectionName,
            collectionId: episode.collectionId,
            artworkUrl100: episode.artworkUrl100,
            artworkUrl600: episode.artworkUrl600,
            episodeUrl: episode.episodeUrl,
            trackName: episode.trackName,
            description: episode.description,
            releaseDate: episode.releaseDate,
            trackTimeMillis: episode.trackTimeMillis,
            trackId: episode.trackId
          }),
        }).then(r => r.json())
        .then(r => console.log(r));
      }

      function pad (string) {
        return ('0' + string).slice(-2)
      }

      function format (seconds) {
        const date = new Date(seconds * 1000)
        const hh = date.getUTCHours()
        const mm = date.getUTCMinutes()
        const ss = pad(date.getUTCSeconds())
        if (hh) {
          return `${hh}:${pad(mm)}:${ss}`
        }
        return `${mm}:${ss}`
      }

  return (
    <div>
      <Container>
        <div className="card row flex-row" id="episode-detail-card">
          <img
            className="col-lg-2 xs-12 card-img-start p-0 episode-detail-image"
            style={{height:"100%"}}
            src={episode.artworkUrl600}
            onClick={handleSearchResultCardClick}
          />
      
          <div className="col-lg-8 card-body" id="podcast-detail-episode-card" onClick={handleSearchResultCardClick}>
            <h4 className="card-title podcast-detail-episode-title">{episode.trackName} <span className="episode-time">{format(episode.trackTimeMillis/1000)}</span></h4> 
            <p className="card-text">{episode.description.substr(0, 300) + " " + "\u2026"}</p>
          </div>
        </div>
        </Container>
    </div>
  );
}

export default EpisodeDetail;
