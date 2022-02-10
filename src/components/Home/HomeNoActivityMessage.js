import React from 'react'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import RandomPodcasts from '../Search/RandomPodcasts';
import Search from '../Search/Search';

function HomeNoActivityMessage({currentUser}) {
  return (
      <>
    <Container>
        <Row xs={10} className="d-flex justify-content-center">
          
            <h3 className="page-subheading">Welcome, {currentUser.user.username}</h3>
        </Row>
      </Container>
      <Container>
        <Row>
            <Search currentUser={currentUser} />
        </Row>
      </Container>
        </>
  )
}

export default HomeNoActivityMessage