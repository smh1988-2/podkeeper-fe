import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Splash from "./Splash";
import "./User.css";
import Background from "./splash-background.png";

// Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Forms({ setCurrentUser, currentUser }) {
  return (
    <div>
      <Row
        className="g-0 align-middle"
        id="full-row"
        style={{ height: "90.79vh" }}
      >
        <Col
          id="half-page"
          style={{
            backgroundImage: `url(${Background}), linear-gradient(
    245deg,
    rgba(99, 111, 101, 0.8491771708683473) 0%,
    rgba(174, 182, 175, 1) 100%
  )`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <Splash />
        </Col>

        <Col>
          <Container>
            <Row className="g-0" id="form-container">
              <Col></Col>
              <Col xs={7} className="text-center">
                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  fill justify
                >
                  <Tab eventKey="login" title="LOG IN">
                    <Login
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                    />
                  </Tab>

                  <Tab eventKey="signup" title="SIGN UP">
                    <Signup
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                    />
                  </Tab>
                </Tabs>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Forms;
