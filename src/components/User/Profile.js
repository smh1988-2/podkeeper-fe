import React from "react";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Profile({ currentUser }) {
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");


  function handleUserSearchSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    console.log(e);
  }

  return (
    <div>
      {currentUser.user ? (
        <>
          <Container>
            <Row>
              <Col>
                {/* Move this to a new component!! */}
                
                <img
                  src={currentUser.user.profile_pic}
                  alt={currentUser.user.username}
                />
                <h3 className="page-subheading">{currentUser.user.username}</h3>
                <p>You are subscribed to X podcasts.</p>
                <p>Following: X</p>
                <p>Followed by: Y</p>
                <Button>Logout</Button>
              </Col>
              <Col xs={6}>
              <h3 className="page-subheading">Find your friends</h3>
                <Form
                  noValidate
                  //validated={validated}
                  onSubmit={handleUserSearchSubmit}
                  id="user-search-form"
                >
                  <Form.Group className="mb-3" controlId="login-username">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Search by username..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="standard-button"
                  >
                    Search
                  </Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      ) : (
        <p>Please sign in or create an account.</p>
      )}
    </div>
  );
}

export default Profile;
