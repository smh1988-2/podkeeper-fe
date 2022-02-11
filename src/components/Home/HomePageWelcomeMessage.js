import React from "react";
import { Link } from "react-router-dom";
import HomeBackground from "./home-background.png";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function HomePageWelcomeMessage() {
  return (
    <div>
      <Row
        className="text-center"
        id="welcome-row"
        style={{
          backgroundImage: `url(${HomeBackground}), linear-gradient(
    245deg,
    rgba(99, 111, 101, 0.8491771708683473) 0%,
    rgba(174, 182, 175, 1) 100%
  )`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
      >
        <Col></Col>
        <Col xs={6}>
          <img
            src="podkeeper-white.png"
            alt="podkeeper-logo"
            className="home-welcome-message-logo"
          />
          <span
            style={{ color: "#ffffff", fontSize: "17px", fontWeight: "400" }}
          >
            <p>Track your listening in one place</p>

            <p>See what your friends are listening to</p>
          </span>

          <Row className="text-center">
            <Col></Col>

            <Col>
              <Row>&nbsp;</Row>
              <Link to="/login">
                <Button className="global-button">Login to Podkeeper</Button>
              </Link>
            </Col>

            <Col></Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default HomePageWelcomeMessage;
