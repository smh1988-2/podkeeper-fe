import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    RiPauseFill,
    RiPlayFill,
    RiArrowGoBackLine,
  RiArrowGoForwardFill
  } from "react-icons/ri";

function PlayAndSkipControls({ handleBackward, handleForward, handlePlayPause, playing }) {
  return (
    <div>
      {" "}
      <Row id="play-pause-row" className="align-middle">
        <Col></Col>
        <Col>
          <br />
          <span style={{ fontSize: "2em", color: "#2E5B4F" }}>
            <RiArrowGoBackLine onClick={handleBackward} />
          </span>
        </Col>
        <Col>
          <span
            style={{ fontSize: "4em", color: "#2E5B4F" }}
            id="play-pause-button"
          >
            {playing ? (
              <RiPauseFill onClick={handlePlayPause} />
            ) : (
              <RiPlayFill onClick={handlePlayPause} />
            )}
          </span>
        </Col>

        <Col>
          <br />
          <span style={{ fontSize: "2em", color: "#2E5B4F" }}>
            <RiArrowGoForwardFill onClick={handleForward} />
          </span>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default PlayAndSkipControls;
