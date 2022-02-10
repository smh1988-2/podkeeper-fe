import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function FriendActivity({ userFriendActivity, handleDate }) {
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
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">Friend activity</h3>
        </Row>
      </Container>
      <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-left"
        >
      {activityArray.map((friend_activity) => {
        return (
          //   <p>
          //     {friend_activity.user.username}
          //     has been {friend_activity.activity_type} with{" "}
          //     {friend_activity.podcast.collectionName} on{" "}
          //     {handleDate(friend_activity.created_at)}
          //   </p>

          // <a href={`/podcasts/${act.podcast.collectionId}`}>
          <Card
            key={friend_activity.id}
            className="result-card"
            style={{
              width: "15rem",
              border: "0",
            }}
          >
            <Card.Img
              variant="top"
              src={friend_activity.podcast.artworkUrl600}
            />
            <Card.Body className="home-card-body">
              <Card.Title style={{ marginTop: "5px", fontSize: "16px" }}>
                {friend_activity.podcast.collectionName} -
                {friend_activity.user.username}
              </Card.Title>
              <Card.Text className="home-date-text">
                {/* {handleDate(act.created_at)} */}
              </Card.Text>
            </Card.Body>
          </Card>
          // </a>
        );
      })}
      </Row>
      </Container>
    </div>
  );
}

export default FriendActivity;

{
  /* <strong>{act.episode.trackName}</strong> */
}
