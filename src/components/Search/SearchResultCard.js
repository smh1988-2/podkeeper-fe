import React from "react";
import env from "react-dotenv";
import Rating from "react-rating";
import Card from "react-bootstrap/Card";

import { RiHeart3Line, RiHeart3Fill} from "react-icons/ri";

function SearchResultCard({ result, stars }) {
  const token = localStorage.getItem("token");

  function handleSearchResultCardClick(e) {
    // create the podcast in the backend
    fetch(`${env.API_URL}/podcasts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        collectionName: result.collectionName,
        artistName: result.artistName,
        artworkUrl100: result.artworkUrl100,
        artworkUrl600: result.artworkUrl600,
        primaryGenreName: result.primaryGenreName,
        artistId: result.artistId,
        collectionId: result.collectionId,
      }),
    }).then((r) => r.json());
    //.then(r => console.log(r));
  }

  function handleStarRatingClick(e) {
    console.log(e)
    // post fetch method to send rating to backend. move this to MyPodcasts?
  }

  return (
    <div>
      <Card
        className="result-card"
        data-podcast-id={result.collectionId}
        style={{
          margin: "30px",
          marginBottom: "25px",
          border: "0",
        }}
        onClick={handleSearchResultCardClick}
      >
        <Card.Img variant="top" src={result.artworkUrl600} />
        <Card.Title
          id="podcast-result-title"
          style={{ height: "50px", marginTop: "10px" }}
        >
          {result.collectionName}
          
          {/* move to new component outside the card */}
          {stars ? (
        <>
        <br /><br />
        <span style={{ fontSize: "20px", color: "#FFBA01" }}>
          {/* rating */}
          </span>
        </>
      ) : null}

        </Card.Title>
      </Card>
      
    </div>
  );
}

export default SearchResultCard;
