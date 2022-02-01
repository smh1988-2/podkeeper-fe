import React from "react";

function EpisodeDetail({ episode }) {
  return (
    <div>
      <div className="container my-4">
        <div className="card row flex-row" id="episode-detail-card">
          <img
            className="col-2 card-img-start p-0"
            src={episode.artworkUrl160}
            height="80%"
            
          />
          <div className="col-lg-8 card-body">
            <h4 className="card-title">{episode.trackName}</h4>
            <p className="card-text">{episode.description.substr(0, 300) + " " + "\u2026"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
