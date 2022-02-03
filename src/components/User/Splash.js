import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MdPodcasts } from "react-icons/md"

function Splash() {
  return(
      <>
          <Row style={{ height: "75%" }} className="text-center align-middle">
          <Row className="g-0 align-middle">&nbsp;</Row>
              <Col></Col>
              <Col xs={10} className="text-center align-middle">
                  <MdPodcasts className="white-text"/>
                  <br /><br />
                  <h1 className="white-text">Hello, listener!</h1>
                  <h4 className="white-text-subheading">Log in or sign up to start listening to podcasts, rating episodes and sharing your favorites with friends.</h4>
              </Col>
              <Col></Col>
          </Row>
      </>);
}

export default Splash;
