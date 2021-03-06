import React, { useState } from "react";
import SearchResults from "./SearchResults";
import RandomPodcasts from "./RandomPodcasts";
import "./Search.css";
import { AiOutlineSearch } from "react-icons/ai";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Search({ currentUser }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    setSearchError("");
    setSearchResults([]);
    fetch(
      `https://itunes.apple.com/search?term=${e.target[0].value}&entity=podcast&attributeType=titleTerm&limit=12.`
    )
      .then((r) => r.json())
      .then((r) => {
        if (r.results.length > 0) {
          setSearchResults(r.results);
        } else {
          setSearchError("no results");
        }
      });
  }

  return (
    <div>
      <Row id="search-row">
        <Col></Col>
        <Col xs={10} md={6}>
          <h2 className="subheading-white">Search</h2>
          <br />
          <Form onSubmit={(e) => handleSearchFormSubmit(e)}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for a podcast..."
                aria-label="Search for a podcast..."
                aria-describedby="basic-addon2"
              />
              <Button
                type="submit"
                variant="outline-secondary"
                id="button-addon2"
              >
                <span id="search-icon">
                  <AiOutlineSearch />
                </span>
              </Button>
            </InputGroup>
          </Form>
          <Row className="text-center">
            <p id="search-subtext">
              Doughboys, Why Won't You Date Me?, Sloppy Seconds, Comedy Bang
              Bang...
            </p>
          </Row>
        </Col>
        <Col></Col>
      </Row>

      <SearchResults searchResults={searchResults} currentUser={currentUser} />

      {searchError === "no results" ? (
        <>
          <Row style={{ paddingTop: "30px" }}>
            <Col></Col>
            <Col xs={10} md={6} className="text-center">
              <p>Sorry, we couldn't find that ????</p>
              <p>Try searching for another podcast.</p>
            </Col>
            <Col></Col>
          </Row>
        </>
      ) : null}

      {searchResults ? <RandomPodcasts /> : null}
    </div>
  );
}

export default Search;
