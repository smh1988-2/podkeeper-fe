import React from "react";
import "./Header.css";
import logo from "./podkeeper-wordmark.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";


function Header({ currentUser }) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
            <Link to="/home">
              <img src={logo} width="200px"/>
            </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Col></Col>
            <Nav >
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
                  {currentUser.user.username}
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
             
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
