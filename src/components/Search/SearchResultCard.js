import React from "react";
import Card from "react-bootstrap/Card";

function SearchResultCard({ result, stars }) {
  const token = localStorage.getItem("token");

  function handleSearchResultCardClick(e) {
    // create the podcast in the backend
    fetch(`${process.env.REACT_APP_API_URL}/podcasts`, {
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

  return (
    <div>
      <Card
        className="result-card-search-page"
        data-podcast-id={result.collectionId}
        style={{
          // width: "15rem",
          border: "0",
        }}
        onClick={handleSearchResultCardClick}
      >
        <Card.Img variant="top" src={result.artworkUrl600} />
        <Card.Title
          className="podcast-result-title"
          style={{ height: "50px", marginTop: "10px" }}
        >
          {result.collectionName}
          
          {/* move to new component outside the card */}
          {/* {stars ? (
        <>
        <br /><br />
        <span style={{ fontSize: "20px", color: "#FFBA01" }}>
          rating
          </span>
        </>
      ) : null} */}

        </Card.Title>
      </Card>
      
    </div>
  );
}

export default SearchResultCard;
