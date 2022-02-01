import React from "react";
import SearchResultCard from "./SearchResultCard";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function SearchResults({ searchResults, currentUser }) {
  return (
    <div>
      <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-center"
        >
          {searchResults
            ? searchResults.map((result) => {
                return (
                  <>
                    <Link to={`/podcasts/${result.collectionId}`}>

                    <SearchResultCard key={result.collectionId} result={result} currentUser={currentUser} />

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

export default SearchResults;
