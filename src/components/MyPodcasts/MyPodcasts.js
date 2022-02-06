import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import env from "react-dotenv";

import SearchResultCard from "../Search/SearchResultCard";
import Search from "../Search/Search";
import "../Search/Search.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function MyPodcasts({ currentUser }) {
  const token = localStorage.getItem("token");
  const id = currentUser.user.id;
  const [myPodcasts, setmyPodcasts] = useState([]);
  const [stars, setStars] = useState(true)

  useEffect(() => {
    fetch(`${env.API_URL}/my-podcasts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((podcasts) => {
          setmyPodcasts(podcasts);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }, []);

  return (
    <div>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">My Podcasts</h3>
        </Row>
      </Container>

      <Container>
        <Row
          xs={1}
          md={4}
          className="g-4"
          className="d-flex justify-content-center"
        >
          {myPodcasts.length > 0 ? (
            <>
              {myPodcasts.map((podcast) => {
                return (
                  <>
                    <Link to={`/podcasts/${podcast.podcast.collectionId}`}>
                      <SearchResultCard
                        key={podcast.podcast.collectionId}
                        result={podcast.podcast}
                        currentUser={currentUser}
                        stars={stars}
                      />
                    </Link>
                  </>
                );
              })}
            </>
          ) : (
            <p>
              You're not subscribed to any podcasts! Search for some podcasts.
            </p>
          )}
        </Row>
      </Container>

      <Container style={{width:"150%"}}>
        <Row style={{width:"100%"}} xs={12} className="d-flex justify-content-center">
          <h3 className="page-subheading">
            Add more podcasts
            <br />
            <br />
            <Search />
          </h3>
        </Row>
      </Container>
    </div>
  );
}

export default MyPodcasts;
