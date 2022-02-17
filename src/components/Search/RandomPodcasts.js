import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";
import "./Search.css";
import env from "react-dotenv";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function RandomPodcasts() {
  const [randomPodcasts, setRandomPodcasts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/random`)
      .then((r) => r.json())
      .then((r) => {
        //console.log("the podcasts are: ",r)
        setRandomPodcasts(r)
      });
  }, []);

  return (
    <div>
      <Container>
        <Row xs={10}>
          <h3 className="page-subheading">
            Or check out these popular podcasts
          </h3>
        </Row>
      </Container>

      <Container>
        <Row
          xs={12}
          md={6}
        >
          {randomPodcasts
            ? randomPodcasts.map((result) => {
                return (
                  <div key={result.collectionId}>
                    <Link to={`/podcasts/${result.collectionId}`}>
                      <SearchResultCard
                        key={result.collectionId}
                        result={result}
                      />
                    </Link>
                  </div>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
}

export default RandomPodcasts;