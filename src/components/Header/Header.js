import React from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Header({ currentUser }) {
  return (
    <div>
      <Row id="header-row">
        <Col xs={5} id="header-wordmark">
          <h1>Podkeeper</h1>
        </Col>
        <Col xs={5}>
          <Nav fill activeKey="/home">
            <Nav.Item>
              <Link to="/home" id="header-nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
            <Link to="/my-podcasts" id="header-nav-link">
                My Podcasts
              </Link>
            </Nav.Item>
            <Nav.Item>
            <Link to="/network" id="header-nav-link">
                Network
              </Link>
            </Nav.Item>
            <Nav.Item>
            <Link to="/search" id="header-nav-link">
                Search
              </Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={2} id="header-user">
          {currentUser.user ? (
            <>
              <Row>
                <div className="user-parent">
                  <p className="user-child">{currentUser.user.first_name}</p>
                  <img
                    className="user-child"
                    src="test-profile.png"
                    alt="profile pic"
                    height="35px"
                  />
                </div>
              </Row>
            </>
          ) : <>
           <Link to="/login" id="header-nav-link">
                Login
              </Link></>}
        </Col>
      </Row>
    </div>
  );
}

export default Header;
