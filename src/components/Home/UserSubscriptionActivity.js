import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function UserSubscriptionActivity({ userActivity, handleDate }) {
  return (
    <>
    <Container>
            <Row xs={10} className="d-flex justify-content-center">
              <h3 className="page-subheading">Recent subscriptions</h3>
            </Row>
          </Container>
          
      <Container>
        <Row xs={10} className="g-4">
          {userActivity
            .filter((act) => act.activity_type === "subscription")
            .map((act) => {
              return (
                <p key={act.podcast.id}>
                  You subscribed to{" "}
                  <strong>{act.podcast.collectionName}</strong> on{" "}
                  {handleDate(act.created_at)}.
                </p>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default UserSubscriptionActivity;
