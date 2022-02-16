import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    RiAddFill,
    RiSubtractFill,
  } from "react-icons/ri";

function SpeedControls({ handleSlower, playbackRate, handleFaster }) {
  return (
    <Row>
      <Col></Col>
      <Col xs="10">
        <Row>
          <Col className="minus-button">
            <span style={{ fontSize: "25px", color: "#2E5B4F" }}>
              <RiSubtractFill onClick={handleSlower} />
            </span>
          </Col>

          <Col>
            <span style={{ fontSize: "20px", color: "#cecece" }}>
              {playbackRate}x
            </span>
          </Col>

          <Col className="plus-button">
            <span style={{ fontSize: "25px", color: "#2E5B4F" }}>
              <RiAddFill onClick={handleFaster} />
            </span>
          </Col>
        </Row>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default SpeedControls;
