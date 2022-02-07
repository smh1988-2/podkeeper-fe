import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Col from "react-bootstrap/Col";

import Container from "react-bootstrap/Container";

function Loading({ loading }) {
  return (
    <div>
      <Container>
        <Col></Col>
        <Col className="text-center loading-animation">
          <ScaleLoader
            color={"#485049"}
            loading={loading}
            height={50}
            size={250}
          />{" "}
        </Col>
        <Col></Col>
      </Container>
    </div>
  );
}

export default Loading;
