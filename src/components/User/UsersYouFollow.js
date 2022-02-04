import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";

function UsersYouFollow({ userIsFollowing }) {
  console.log(userIsFollowing);

  return (
    <div>
      {userIsFollowing.length > 0 ? (
        <>
          <h3 className="page-subheading">Following</h3>

          {userIsFollowing.map((user) => {
            return (
              <>
              {/* user is following does not have the info for user 2. need a custom serializer? Or a new fetch :( */}
                <Card style={{ width: "5rem", border: "0px" }}>
                  <Card.Img
                    variant="top"
                    src={user.user.profile_pic}
                    alt={user.user.profile_pic}
                  />
                  <Card.Body id="profile-card">
                    <Card.Title>{user.user.username}</Card.Title>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </>
      ) : (
        <p>You're not following anyone. Add some above!</p>
      )}
    </div>
  );
}

export default UsersYouFollow;
