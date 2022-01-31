import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <div>
      
      <Row>
          <Col><h1>Podkeeper</h1></Col>
          <Col>
      <Nav fill activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>My Podcasts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Network</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Search</Nav.Link>
        </Nav.Item>
      </Nav>
      </Col>
      <Col></Col>
      </Row>
    </div>
  );
}

export default Header;
