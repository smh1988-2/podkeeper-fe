import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function UserSubscriptionActivity({ userActivity, handleDate }) {
  return (
    <>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
        {userActivity.filter((act) => act.activity_type === "subscription")
            .length > 0 ? (
            <h3 className="page-subheading">Recent subscriptions</h3>
          ) : null}
        </Row>
      </Container>

      <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-left"
        >
          {userActivity
            .filter((act) => act.activity_type === "subscription")
            .slice(0,5).map((act) => {
              return (
                <a href={`/podcasts/${act.podcast.collectionId}`}>
                  <Card
                  key={act.id}
                    className="result-card"
                    style={{
                      width: "15rem",
                      border: "0",
                    }}
                  >
                    <Card.Img variant="top" src={act.podcast.artworkUrl600} />
                    <Card.Body className="home-card-body">
                      <Card.Title
                        style={{ marginTop: "5px", fontSize: "16px" }}
                      >
                        
                          <strong>{act.podcast.collectionName}</strong>
                        
                      </Card.Title>
                      <Card.Text className="home-date-text">{handleDate(act.created_at)}</Card.Text>
                    </Card.Body>
                  </Card>
                  </a>
               
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default UserSubscriptionActivity;
