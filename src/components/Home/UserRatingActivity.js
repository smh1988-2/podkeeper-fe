import React from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function UserRatingActivity({ userActivity, handleDate }) {
  return (
    <>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">Recent ratings</h3>
        </Row>
      </Container>

      <Container>
        <Row xs={10} className="g-4">
          {userActivity
            .filter((act) => act.activity_type === "podcast-rating")
            .map((act) => {
              //console.log(act);
              return (
                <p key={act.podcast.id}>
                  You rated {" "}
                  <a href={`/podcasts/${act.podcast.collectionId}`}>
                    <strong>{act.podcast.collectionName}</strong>
                  </a>
                  {" "}{act.rating / 20} stars on {handleDate(act.created_at)}.
                </p>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default UserRatingActivity;
