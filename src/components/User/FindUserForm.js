import React from "react";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { AiOutlineSearch } from "react-icons/ai";

function FindUserForm({
  validated,
  searchTerm,
  setSearchTerm,
  handleUserSearchSubmit,
}) {
  return (
    <div className="following-row">
      <h3 className="page-subheading">Find your friends</h3>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleUserSearchSubmit}
        id="user-search-form"
      >
        <Form.Group className="mb-3" controlId="search-username">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for a user..."
              aria-label="Search for a user..."
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              required
              type="text"
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
        </Form.Group>
      </Form>
    </div>
  );
}

export default FindUserForm;
