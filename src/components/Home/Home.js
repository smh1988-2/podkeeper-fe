import React from "react";
import { useState, useEffect } from "react";
import HomePageWelcomeMessage from "./HomePageWelcomeMessage";
import UserSubscriptionActivity from "./UserSubscriptionActivity";
import UserEpisodeActivity from "./UserEpisodeActivity";
import ScaleLoader from "react-spinners/ScaleLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import env from "react-dotenv";
import { Container } from "react-bootstrap";

function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`${env.API_URL}/my-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          console.log(data);
        });
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  function handleDate(date) {
    if (date === null) {
      return date;
    } else {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    }
  }

  return (
    <div>
      {/* {currentUser.user && !loading ? (
        <h1>Welcome Home, {currentUser.user.username}.</h1>
      ) : null} */}

      {!loading && userActivity.length > 0 ? (
        <>
          <UserSubscriptionActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />

          <UserEpisodeActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
        </>
      ) : null}

      {currentUser.user ? (
        <>
          {/* MOVE TO NEW COMPONENT */}
          <Container>
            <Col></Col>
            <Col className="text-center loading-animation">
              <ScaleLoader
                color={"#485049"}
                loading={loading}
                height={50}
                size={250}
              />{" "}
            </Col>
            <Col></Col>
          </Container>
        </>
      ) : null}

      {currentUser.user ? null : (
        <HomePageWelcomeMessage currentUser={currentUser} />
      )}
    </div>
  );
}

export default Home;
