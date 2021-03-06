import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import env from "react-dotenv";

import LoginButton from "../User/LoginButton";
import SearchResultCard from "../Search/SearchResultCard";
import Search from "../Search/Search";
import Loading from "../Home/Loading";
import "../Search/Search.css";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function MyPodcasts({ currentUser }) {
  const [myPodcasts, setmyPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(true);

  const token = localStorage.getItem("token");
  let id;

  if (currentUser.user) {
    id = currentUser.user.id;
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/my-podcasts/${id}`, {
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
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  return (
    <div>
      <Container>
        <Row xs={10} className="d-flex justify-content-center">
          <h3 className="page-subheading">My podcasts</h3>
        </Row>
      </Container>

      {myPodcasts.length > 0 && !loading ? (
        <>
          <Container>
            <Row
              xs={1}
              md={6}
              className="g-4"
              className="d-flex justify-content-left"
            >
              {myPodcasts.map((podcast) => {
                return (
                  <div key={podcast.podcast.id}>
                    <Link to={`/podcasts/${podcast.podcast.collectionId}`}>
                      <SearchResultCard
                        key={podcast.podcast.collectionId}
                        result={podcast.podcast}
                        currentUser={currentUser}
                        stars={stars}
                      />
                    </Link>
                  </div>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Row className="d-flex justify-content-center">
              {/* hide if logged out? */}
              <Loading loading={loading} />
            </Row>
          </Container>
        </>
      )}

      {currentUser.user ? null : <LoginButton currentUser={currentUser} />}

      <Container>
        <Row
          xs={12}
          className="d-flex justify-content-center"
        >
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
