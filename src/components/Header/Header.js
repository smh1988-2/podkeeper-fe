import React from "react";
import "./Header.css";
import logo from "./podkeeper-wordmark.png"
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Header({ currentUser }) {
  return (
    <div>
      <Row id="header-row">
        <Col></Col>
        <Col>
          <Link to="/home">
            <img src={logo} height="50%" />
          </Link>
        </Col>


        <Col xs={6} className="text-right">
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

            {currentUser.user ? (
              <>
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

                <Nav.Item>
                  <Link
                    to="/profile"
                    id="header-nav-link"
                    className="header-link-item"
                  >
                    Profile
                  </Link>
                </Nav.Item>
              </>
            ) : null}
            {currentUser.user ? null : (
              <>
                <br />
                <Link
                  to="/login"
                  id="header-nav-link"
                  className="header-link-item"
                >
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Header;
