import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserSearchReturnedUser({
  returnedUser,
  currentUser,
  userIsFollowing,
}) {
  //checks if the currentUser is already following the returnedUser, i.e. userIsFollowing.some(checkUserId)
  const checkUserId = (obj) => obj.user2_id === returnedUser.id;
  const [clicked, setClicked] = useState(false);

  function handleFollowClick() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:3000/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //NEED TO INCLUDE TOKEN LOL
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
            console.log(err);
          });
        }
      });
    }
    setClicked(!clicked);
  }

  return (
    <div>
      <Row>&nbsp;</Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col xs={12}>
          <Row>
            <Col></Col>
            <Col id="profile-card">
              <Card style={{ width: "18rem", border: "0px" }}>
                <Card.Img
                  variant="top"
                  src={returnedUser.profile_pic}
                  alt={returnedUser.profile_pic}
                />
                <Card.Body id="profile-card">
                  <Card.Title>{returnedUser.username}</Card.Title>

                {/* Button doesn't update on click. Need to fix this!!!!  */}
                  {userIsFollowing.some(checkUserId) ? (
                    <Button
                      disabled
                      className="standard-button"
                      variant="primary"
                      onClick={handleFollowClick}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      className="standard-button"
                      variant="primary"
                      onClick={handleFollowClick}
                    >
                      Follow
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserSearchReturnedUser;
