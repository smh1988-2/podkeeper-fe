import React, { useState } from "react";
import env from "react-dotenv";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserSearchReturnedUser({
  returnedUser,
  currentUser,
  userIsFollowing,
  setReturnedUser
}) {
  //checks if the currentUser is already following the returnedUser, i.e. userIsFollowing.some(checkUserId)

  const checkUserId = (obj) => obj.id === returnedUser.id;

  const [clicked, setClicked] = useState(false);

  function handleFollowClick() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${env.API_URL}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: currentUser.user.id,
          user2_id: returnedUser.id,
          rel_type: "following",
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((res) => {
            console.log(res);
          });
        } else {
          r.json().then((err) => {
            //console.log(err);
          });
        }
      });
    }
    setClicked(!clicked);
    setReturnedUser(false)
  }

  return (
    <div>
      <Row>
        <Col>
          <Row className="text-center">
            <Col></Col>
            <Col>
              <Card
                style={{ padding: "20px", border: "0px" }}
                key={returnedUser.id}
                className="search-profile-page-card"
              >
                <div className="circle-follow">{returnedUser.username}</div>
                <br />
                {userIsFollowing.some(checkUserId) ? (
                  <Button
                    disabled
                    className="global-button"
                    variant="primary"
                    onClick={handleFollowClick}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    className="global-button"
                    variant="primary"
                    onClick={handleFollowClick}
                  >
                    Follow
                  </Button>
                )}
              </Card>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserSearchReturnedUser;
