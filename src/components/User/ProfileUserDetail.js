import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function ProfileUserDetail({
  currentUser,
  setCurrentUser,
}) {
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    setCurrentUser({});
  }

  return (

      <Container className="d-flex justify-content-center">
        <Col xs={6}>
        <Row className="justify-content-center">
      <div className="circle">{currentUser.user.username}</div>
      </Row>

      <Row>
      <Button onClick={handleLogout} className="logout-button">
        Logout
      </Button>
      </Row>
      </Col>
      </Container>

  );
}

export default ProfileUserDetail;
