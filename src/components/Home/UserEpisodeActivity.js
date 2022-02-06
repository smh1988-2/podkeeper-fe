import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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
        <Row xs={10} className="g-4" className="d-flex justify-content-center">
          {userActivity
            .filter((act) => act.activity_type === "listened")
            .map((act) => {
              return (
                <p>
                  You finished <strong>{act.episode.trackName}</strong> from{" "}
                  {act.podcast.collectionName} on {handleDate(act.created_at)}.
                </p>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default UserEpisodeActivity;
