import React from "react";
import Login from "./Login";
import Signup from "./Signup";
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
      <Row
        id="full-row"
        // className="vh-100"
        style={{ height: "calc(100vh - 56px)" }}
         md={2}
      >
        <Col
        sm={8}
          id="half-page"
          style={{
            backgroundImage: `url(${Background}), linear-gradient(
    245deg,
    rgba(99, 111, 101, 0.8491771708683473) 0%,
    rgba(174, 182, 175, 1) 100%
  )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            backgroundPosition: "center"
          }}
        >
        </Col>

        <Col sm={8}>

          <Container>
            <Row className="g-0">
              <Col></Col>
              <Col xs={10} className="text-center" >
                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
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
  );
}

export default Forms;
