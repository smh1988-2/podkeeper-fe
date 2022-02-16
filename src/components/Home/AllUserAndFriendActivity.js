import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import { Rating } from "react-simple-star-rating";

function AllUserAndFriendActivity({ userActivity, handleDate, headerText }) {
  return (
    <div>
      {/* <Container>
        <Row xs={10} className="d-flex justify-content-center">
          {userActivity.length > 0 ? (
            <h3 className="page-subheading">{headerText}</h3>
          ) : null}
        </Row>
      </Container> */}

      <Container>
        <Row xs={1} md={2}>
          {userActivity.map((act) => {
            return (
              <div className="card flex-row">
                <Col md="auto" id="all-activity-card-image">
                  <img
                    className="card-img-top"
                    src={act.podcast.artworkUrl600}
                    alt=""
                    height="100px"
                    id="all-activity-card-image"
                  />
                </Col>

                <Col>
                  <Container
                    style={{ height: "100%" }}
                    id="all-activity-card-text"
                  >
                    <Row>
                      {act.episode_id > 0 ? (
                        <>
                          <p>
                            {act.podcast_id > 0 ? (
                              <>
                                <strong>{act.episode.trackName}</strong>
                                {" - "}
                                <strong>{act.podcast.collectionName}</strong>
                                <br />
                                {act.activity_type === "podcast-rating" || "episode-rating" ? "Rated!" : null}
                          {act.activity_type === "subscription" ? "Subscribed!" : null}
                          {act.activity_type === "listened" ? "Listened!" : null}
                                <br />
                                {act.rating > 0 ? (
                                  <Rating
                                    ratingValue={act.rating}
                                    readonly
                                    size={17}
                                  />
                                ) : null}
                                <br />
                                {handleDate(act.created_at)}
                              </>
                            ) : null}
                          </p>
                        </>
                      ) : (
                        <>
                          <strong>{act.podcast.collectionName}</strong>
                          {act.activity_type === "podcast-rating" ? "Rated!" : null}
                          {act.activity_type === "episode-rating" ? "Rated!" : null}
                          {act.activity_type === "subscription" ? "Subscribed!" : null}
                          {act.activity_type === "listened" ? "Listened!" : null}

                           <br />
                          {act.rating > 0 ? (
                            <Rating
                              ratingValue={act.rating}
                              readonly
                              size={17}
                            />
                          ) : null}
                          {handleDate(act.created_at)}
                        </>
                      )}
                    </Row>
                  </Container>
                </Col>

                <div></div>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default AllUserAndFriendActivity;
