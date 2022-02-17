import React from "react";
import { useState, useEffect } from "react";
import HomePageWelcomeMessage from "./HomePageWelcomeMessage";
import HomeNoActivityMessage from "./HomeNoActivityMessage";
import UserActivityContainer from "./UserActivityContainer";
import Loading from "./Loading";
import UserActivityContainerTwoCol from "./UserActivityContainerTwoCol";
import AllUserAndFriendActivity from "./AllUserAndFriendActivity";
import ReactGA from 'react-ga';
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);
  const [userFriendActivity, setUserFriendActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  ReactGA.pageview(window.location.pathname + window.location.search);

  // get the activity for the current user
  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`${process.env.REACT_APP_API_URL}/my-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          //console.log("user activity data is: ", data);
        });
    }
  }, [loading]);

  // get the activity for the current user's friends. combine with above?
  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`${process.env.REACT_APP_API_URL}/friend-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserFriendActivity(data);
          //console.log("friend data is: ", data);
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
  const activityArray = [];
  userFriendActivity.map((user) => {
    if (user.length > 0) {
      return user.map((user_activity) => {
        activityArray.push(user_activity);
      });
    }
  });

  activityArray.sort(function (a, b) {
    return a.id - b.id;
  });

  return (
    <div>
      {!loading && userActivity.length > 0 ? (
        <>
          {/* Current user's activity */}

          <UserActivityContainer
            userActivity={userActivity}
            handleDate={handleDate}
            type={"listened"}
            headerText={"My recent episodes"}
            numOfItems={8}
          />
          <UserActivityContainerTwoCol
            userActivity={userActivity}
            handleDate={handleDate}
            type={"episode-rating"}
            headerText={"My episode ratings"}
            numOfItems={10}
          />

          {/* Friend's activity */}

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"listened"}
            headerText={"Episodes my friends are listening to"}
            numOfItems={8}
          />

          <UserActivityContainerTwoCol
            userActivity={activityArray}
            handleDate={handleDate}
            type={"episode-rating"}
            headerText={"Friend's episode ratings"}
            numOfItems={10}
          />

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"podcast-rating"}
            headerText={"Friend's podcast ratings"}
            numOfItems={4}
          />

          <Container>
            <Row>
              <Col></Col>
              <Col xs={12}>


                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><h3>All my activity</h3></Accordion.Header>
                    <Accordion.Body>
                      <AllUserAndFriendActivity
                        userActivity={userActivity}
                        handleDate={handleDate}
                        headerText={"All my activity"}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>


              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      ) : null}

      {!loading &&
      userActivity.length === 0 &&
      currentUser.user &&
      userFriendActivity.length === 0 ? (
        <HomeNoActivityMessage currentUser={currentUser} />
      ) : null}

      {currentUser.user ? <Loading loading={loading} /> : null}

      {currentUser.user ? null : (
        <HomePageWelcomeMessage currentUser={currentUser} />
      )}
    </div>
  );
}

export default Home;
