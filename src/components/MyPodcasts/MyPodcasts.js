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
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {setLoading(false)}, 2500);
  })

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
          md={6}
          className="g-4"
          className="d-flex justify-content-center"
        >
          {myPodcasts.length > 0 && !loading ? (
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
            <>
          {/* hide if logged out? */}
          <Loading loading={loading} />
        </>
          )}

          
        </Row>

        {currentUser.user ?
         null :
         <LoginButton currentUser={currentUser} /> }

      </Container>

      <Container style={{ width: "150%" }}>
        <Row
          style={{ width: "100%" }}
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
