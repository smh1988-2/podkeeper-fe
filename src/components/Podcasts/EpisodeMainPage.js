import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function EpisodeMainPage() {
  const [currentEpisode, setCurrentEpisode] = useState({});
  const [audioUrl, setAudioUrl] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/episodes/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setCurrentEpisode(r);
        setAudioUrl(r.episodeUrl)
        console.log(r.episodeUrl);
      });
  }, []);

  return (
    <div>
      {currentEpisode ? (
          <>
        <h2>{currentEpisode.trackName}</h2>
        <img src={currentEpisode.artworkUrl600} alt={currentEpisode.trackName} height="300px" />
        <p>{currentEpisode.description}</p>
        </>
      ) : (
        <p>Something went wrong!</p>
      )}
    </div>
  );
}

export default EpisodeMainPage;
