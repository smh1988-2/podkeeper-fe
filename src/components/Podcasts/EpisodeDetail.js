import React from "react";
import env from "react-dotenv";

function EpisodeDetail({ episode }) {

  const token = localStorage.getItem("token");

    function handleSearchResultCardClick(e) {
        // create the episode in the backend
        fetch(`${env.API_URL}/episodes`, {
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
        // .then(r => console.log(r));
      }


  return (
    <div>
      <div className="container my-4">
        <div className="card row flex-row" id="episode-detail-card">
          <img
            className="col-2 card-img-start p-0"
            src={episode.artworkUrl160}
            height="80%"
            onClick={handleSearchResultCardClick}
          />
          <div className="col-lg-8 card-body" onClick={handleSearchResultCardClick}>
            <h4 className="card-title">{episode.trackName}</h4>
            <p className="card-text">{episode.description.substr(0, 300) + " " + "\u2026"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
