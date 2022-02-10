import React from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { Rating } from "react-simple-star-rating";

function UserEpisodeRatingActivity({ userActivity, handleDate }) {
  return (
    <>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
        {userActivity.filter((act) => act.activity_type === "episode-rating")
            .length > 0 ? (
            <h3 className="page-subheading">Recent episode ratings</h3>
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
            .filter((act) => act.activity_type === "episode-rating")
            .slice(0,10).map((act) => {

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
                        
                          <strong>{act.episode.trackName}</strong>
                    
                      </Card.Title>
                      <Card.Text>
                        <Rating ratingValue={act.rating} readonly size={20} />
                       </Card.Text>
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

export default UserEpisodeRatingActivity;
