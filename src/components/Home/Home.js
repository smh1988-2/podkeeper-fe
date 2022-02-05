import React from 'react';
import { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://podkeeper-be.herokuapp.com/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          console.log(data)
        });
    }
  }, []);

  function handleDate(date) {
    if (date === null) {
      return date
    } else {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
    }
  }

  return <div>
      { currentUser.user ? <h1>Welcome Home, {currentUser.user.username}.</h1> : <h1>Welcome Home.</h1> }

     
      { userActivity.length > 0 ? 

        <>
       <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">
            Recent subscriptions
          </h3>
        </Row>
      </Container>

      <Container>
        <Row
          xs={10}
          
          className="g-4"
          className="d-flex justify-content-center"
        >

        {userActivity.filter(act => act.activity_type === "subscription").map(act => {
          return (
            <p>You subscribed to <strong>{act.podcast.collectionName}</strong> on {handleDate(act.created_at)}.</p>
          )
        })
        }

</Row>
      </Container>




      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">
            Recent episodes
          </h3>
        </Row>
      </Container>

      <Container>
        <Row
          xs={10}
          
          className="g-4"
          className="d-flex justify-content-center"
        >

        {userActivity.filter(act => act.activity_type === "listened").map(act => {
          return (
            <p>You finished <strong>{act.episode.trackName}</strong> from {act.podcast.collectionName} on {handleDate(act.created_at)}.</p>
          )
        })
        }

</Row>
      </Container>
        </>
      
      : <p>No activity.</p> }
      



  </div>;
}

export default Home;
