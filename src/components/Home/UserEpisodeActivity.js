import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function UserEpisodeActivity({ userActivity, handleDate }) {
  return (
    <>
      {" "}
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">Recent episodes</h3>
        </Row>
      </Container>
      <Container>
        <Row xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-left">
          {userActivity
            .slice(0,10).filter((act) => act.activity_type === "listened")
            .map((act) => {
              return (
                
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
                        <a href={`/podcasts/${act.podcast.collectionId}`}>
                          <strong>{act.episode.trackName}</strong>
                        </a>
                      </Card.Title>
                      <Card.Text className="home-date-text">{handleDate(act.created_at)}</Card.Text>
                    </Card.Body>
                  </Card>
                
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default UserEpisodeActivity;
