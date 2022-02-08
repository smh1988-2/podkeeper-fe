import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../User/LoginButton";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { MdPodcasts } from "react-icons/md";

function HomePageWelcomeMessage({ currentUser }) {
  return (
    <div>
      <Row className="text-center" id="welcome-row">
        <Col></Col>
        <Col xs={6}><MdPodcasts className="white-text" style={{fontSize:"60px"}} />
        <h3 className="white-text">Podkeeper</h3>
        <span style={{color:"#ffffff", fontSize:"17px", fontWeight:"400"}}>
        <p>
          Share your love of podcasts with the world. <br />
          Discover the best podcasts out there. <br />
          See what episodes your friends are listening and if they liked it.
        </p>
        <p>
          See all of your podcast activity in one place.
        </p>
        <p>
          <i>Need</i> to find
          that episode with the hilarious story or the really great advice? It's
          tracked in Podkeeper.
        </p>
        </span>

        <Row className="text-center">
        {/* <Row>&nbsp;</Row> */}
        <Col></Col>
        
          <Col>
          <Link to="/login">
            <Button className="global-button">Login to Podkeeper</Button>
            </Link>
          </Col>
 
        <Col></Col>
      </Row>

        
                
        </Col>
        <Col></Col>
      </Row>

      
    </div>
  );
}

export default HomePageWelcomeMessage;
