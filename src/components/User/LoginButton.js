import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function LoginButton({ currentUser }) {
  return (
    <div>
      <Row className="text-center">
        <Col></Col>
        {currentUser ? null : (
          <Col>
            <Button className="global-button">Login to Podkeeper</Button>
          </Col>
        )}
        <Col></Col>
      </Row>
    </div>
  );
}

export default LoginButton;
