import React from "react";
import Card from "react-bootstrap/Card";

function SearchResultCard({
  result
}) {
  function handleSearchResultCardClick(e) {


    // create the podcast in the backend
    fetch("http://127.0.0.1:3000/podcasts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       // Authorization: "Bearer" + currentUser.token,
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
    }).then(r => r.json()).then(r => console.log(r));
  }

  return (
    <div>
      <Card
        data-podcast-id={result.collectionId}
        style={{
          width: "14rem",
          margin: "12px",
          marginBottom: "25px",
          border: "0",
        }}
        onClick={handleSearchResultCardClick}
      >
        <Card.Img variant="top" src={result.artworkUrl600} />
        <Card.Title id="podcast-result-title" style={{ height: "50px", marginTop: "10px" }}>
          {result.collectionName}
        </Card.Title>
      </Card>
    </div>
  );
}

export default SearchResultCard;
