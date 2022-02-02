import React, { useState } from "react";
import SearchResults from "./SearchResults";
import "./Search.css"

// bootstrap
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Search({currentUser}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false)
  
  function handleSearchFormSubmit(e) {
    e.preventDefault();
    setSearchClicked(true)
    fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&entity=podcast&attributeType=titleTerm.`
    )
      .then((r) => r.json())
      .then((r) => {
        setSearchResults(r.results);
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
                onChange={(e) => setSearchTerm(e.target.value)}
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

      <SearchResults searchResults={searchResults} currentUser={currentUser} searchClicked={searchClicked} />

    </div>
  );
}

export default Search;
