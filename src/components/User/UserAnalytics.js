import React, { useEffect, useState } from "react";
import UserAnalyticsNumber from "./UserAnalyticsNumber";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function UserAnalytics({
  userActivity,
  userIsFollowing,
  usersFollowingYou,
  currentUser,
}) {
  const token = localStorage.getItem("token");
  const [totalTimeListened, setTotalTimeListened] = useState(0);

  useEffect(() => {
    if (token && currentUser.user) {
      fetch(
        `http://localhost:3000/total-time-listened/${currentUser.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setTotalTimeListened(data);
          console.log("total time listened: ", data);
        });
    }
  }, []);

  function format(seconds) {
    const date = new Date(seconds);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  function pad(string) {
    return ("0" + string).slice(-2);
  }

  return (
    <>
      <div className="following-row">
        <h3 className="page-subheading">Your stats</h3>
        {totalTimeListened > 0 ? (
          <Col className="text-center">
            <span className="element" id="element-1">
              {format(totalTimeListened)}
            </span>
            <br />
            <span className="element" id="element-2">
              Hours listened
            </span>
          </Col>
        ) : null}
      </div>
      <Container>
        <Row>
          <UserAnalyticsNumber
            userActivity={userActivity}
            type={"subscription"}
            title={"Subscriptions"}
          />
          <UserAnalyticsNumber
            userActivity={userActivity}
            type={"listened"}
            title={"Episodes listened"}
          />
        </Row>

        <Row>&nbsp;</Row>
        <Row>&nbsp;</Row>

        <Row>
          <UserAnalyticsNumber
            userActivity={userActivity}
            type={"episode-rating"}
            title={"Episodes rated"}
          />
          <UserAnalyticsNumber
            userActivity={userActivity}
            type={"podcast-rating"}
            title={"Podcasts rated"}
          />
        </Row>

        <Row>&nbsp;</Row>
        <Row>&nbsp;</Row>

        <Row>
          <Col className="text-center">
            <span className="element" id="element-1">
              {userIsFollowing.length}
            </span>
            <br />
            <span className="element" id="element-2">
              Following
            </span>
          </Col>
          <Col className="text-center">
            <span className="element" id="element-1">
              {usersFollowingYou.length}
            </span>
            <br />
            <span className="element" id="element-2">
              Followers
            </span>
          </Col>
        </Row>
      </Container>
      <Row>&nbsp;</Row>
    </>
  );
}

export default UserAnalytics;
