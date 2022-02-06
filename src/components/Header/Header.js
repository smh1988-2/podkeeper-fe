import React from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { MdPodcasts } from "react-icons/md";

function Header({ currentUser }) {
  return (
    <div>
      <Row id="header-row">

<Col xs={1}></Col>
<Col>
      <Container>
        <Row className="d-flex">
        <Col xs={12} id="header-wordmark">
          <Row id="wordmark-row">

            <Col className="col-auto">
            <MdPodcasts />
            </Col>

            <Col>
            <h2 className="brand-name">Podkeeper</h2>
            </Col>

          </Row>
        </Col>
        </Row>
      </Container>
</Col>
        <Col xs={2}></Col>

        <Col xs={5}>
          <Nav>
            <Nav.Item>
              <Link
                to="/home"
                id="header-nav-link"
                className="header-link-item"
              >
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/my-podcasts"
                id="header-nav-link"
                className="header-link-item"
              >
                My Podcasts
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/search"
                id="header-nav-link"
                className="header-link-item"
              >
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
                  <Link to="/profile" id="header-nav-link">
                    {" "}
                    <p className="user-child">{currentUser.user.username}</p>
                    <img
                      className="user-child"
                      src="test-profile.png"
                      alt="profile pic"
                      height="35px"
                    />
                  </Link>
                </div>
              </Row>
            </>
          ) : (
            <>
              <Link to="/login" id="header-nav-link">
                Login
              </Link>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Header;
