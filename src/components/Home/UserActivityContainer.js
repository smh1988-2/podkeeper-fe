import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { Rating } from "react-simple-star-rating";

function UserActivityContainer({
  userActivity,
  handleDate,
  type,
  headerText,
  numOfItems,
}) {
  return (
    <div>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          {userActivity.filter((act) => act.activity_type === type).length >
          0 ? (
            <h3 className="page-subheading">{headerText}</h3>
          ) : null}
        </Row>
      </Container>

      <Container>
        <Row
          xs={1}
          md={4}
          className="recent-episodes"
        >
          {userActivity
            .filter((act) => act.activity_type === type)
            .slice(0, numOfItems)
            .map((act) => {
              return (
                <div key={act.id}>
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
                        <br />
                        {/* show the episode name, if applicable */}
                        {act.episode_id > 0 ? (
                          <strong>{act.episode.trackName}</strong>
                        ) : null}
                      </Card.Title>
                      <Card.Text className="home-date-text">
                        {/* show the rating, if applicable */}
                        {act.rating > 0 ? 
                        <>
                        {act.user ? act.user.username : null}
                        <br />
                          <Rating ratingValue={act.rating} readonly size={20} />
                          <br />
                          </>

                         : null}


                        
                        {handleDate(act.created_at)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
                </div>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default UserActivityContainer;
