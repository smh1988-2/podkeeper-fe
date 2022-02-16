import React from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import { Rating } from "react-simple-star-rating";

function UserActivityContainerTwoCol({
  userActivity,
  handleDate,
  type,
  headerText,
  numOfItems,
}) {
  return (
    <div>
      <div style={{ backgroundColor: "#2e5b4f" }}>
        <Container>
          <Row xs={10} className="d-flex justify-content-center">
            {userActivity.filter((act) => act.activity_type === type).length >
            0 ? (
              <h3 className="page-subheading-white">{headerText}</h3>
            ) : null}
          </Row>
        </Container>

        <Container>
          <Row xs={1} md={2} style={{ paddingBottom: "40px" }}>
            {userActivity
              .filter((act) => act.activity_type === type)
              .slice(0, numOfItems)
              .map((act) => {
                return (
                  <div key={act.id} style={{ paddingTop: "30px" }}>
                    <a href={`/episodes/${act.episode.trackId}`}>
                      <div className="card flex-row ">
                        <Col md="auto">
                          <img
                            className="card-img-top"
                            id="two-col-card-image"
                            src={act.podcast.artworkUrl600}
                            alt=""
                            height="130px"
                          />
                        </Col>

                        <Col className="two-col-text-area">
                          <Container style={{ height: "100%" }}>
                            <Row>
                              {act.episode_id > 0 ? (
                                <>
                                  <p className="two-col-title">
                                    <strong>{act.episode.trackName}</strong>
                                  </p>

                                  <p className="two-col-date">
                                    <Rating
                                      ratingValue={act.rating}
                                      readonly
                                      size={20}
                                    />
                                    
                                    {act.user ? <><br />{act.user.username}</> : null}
                                    <br />
                                    {handleDate(act.created_at)}
                                  </p>
                                </>
                              ) : null}
                            </Row>
                          </Container>
                        </Col>

                        <div></div>
                      </div>
                    </a>
                  </div>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserActivityContainerTwoCol;
