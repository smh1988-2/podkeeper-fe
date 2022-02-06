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
    fetch(`${env.API_URL}/random`)
      .then((r) => r.json())
      .then((r) => setRandomPodcasts(r));
  }, []);

  return (
    <div>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">
            Or check out these popular podcasts
          </h3>
        </Row>
      </Container>

      <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-center"
        >
          {randomPodcasts
            ? randomPodcasts.map((result) => {
                return (
                  <>
                    <Link to={`/podcasts/${result.collectionId}`}>
                      <SearchResultCard
                        key={result.collectionId}
                        result={result}
                      />
                    </Link>
                  </>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
}

export default RandomPodcasts;