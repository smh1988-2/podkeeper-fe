import React from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function UsersYouFollow({ userIsFollowing }) {
  // console.log(userIsFollowing);

  return (
    <div>
      {userIsFollowing.length > 0 ? (
        <>
          <h3 className="page-subheading">Following</h3>

          <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-left"
        >
          {userIsFollowing.map((user) => {
            return (
              <>
                <Card style={{ width: "7rem", border: "0px" }} key={user.id} >
                  <Card.Img
                    variant="top"
                    src={user.profile_pic}
                    alt={user.profile_pic}
                  />
                  <Card.Body id="profile-card">
                    <Card.Title style={{fontSize: "15px"}}>{user.username}</Card.Title>
                  </Card.Body>
                </Card>
              </>
            );
          })}
          </Row>
      </Container>
        </>
      ) : (
        null
      )}
      
    </div>
  );
}

export default UsersYouFollow;
