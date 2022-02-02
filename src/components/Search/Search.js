import React, { useState } from "react";
import SearchResults from "./SearchResults";
import "./Search.css";

// bootstrap
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Search({ currentUser }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("")

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    setSearchError("");
    setSearchResults([]);
    fetch(
      `https://itunes.apple.com/search?term=${e.target[0].value}&entity=podcast&attributeType=titleTerm.`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r.results)
        if (r.results.length > 0) {
          setSearchResults(r.results);
        } else {
          setSearchError("no results")
        }
      });
  }

  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <h2 className="subheading">Search</h2>
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
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col></Col>
      </Row>

      
        <SearchResults
          searchResults={searchResults}
          currentUser={currentUser}
        />

{searchError.length > 0  ? 
     
        <>
          <Row style={{paddingTop:"30px"}}>
            <Col></Col>
            <Col className="text-center">
              <p>Sorry, we couldn't find that 😢</p>
              <p>Try searching for another podcast.</p>
            </Col>
            <Col></Col>
          </Row>
        </> : null }

    </div>
  );
}

export default Search;
