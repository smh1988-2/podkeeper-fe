import React from "react";
import { useState, useEffect } from "react";

import ProfileUserDetail from "./ProfileUserDetail";
import FindUserForm from "./FindUserForm";
import UserSearchReturnedUser from "./UserSearchReturnedUser";
import UsersYouFollow from "./UsersYouFollow";
import UserFollowers from "./UserFollowers";
import UserAnalytics from "./UserAnalytics";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Profile({ currentUser, setCurrentUser }) {
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [returnedUser, setReturnedUser] = useState(false);
  const [error, setError] = useState("");
  const [userIsFollowing, setUserIsFollowing] = useState([]); //rename to usersYouFollow
  const [usersFollowingYou, setUsersFollowingYou] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`http://localhost:3000/my-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          //console.log("user activity data is: ", data);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.user) {
      fetch(`http://localhost:3000/following/${currentUser.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          setUserIsFollowing(res);
          //console.log("user is following: ", res);
        });
    }
  }, [returnedUser, currentUser]);

  useEffect(() => {
    if (currentUser.user) {
      fetch(`http://localhost:3000/followers/${currentUser.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          setUsersFollowingYou(res);
        });
    }
  }, [returnedUser, currentUser]);

  function handleUserSearchSubmit(e) {
    e.preventDefault();
    setReturnedUser(false);
    setError("");
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/user-search/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReturnedUser(data);
            //console.log("returned user is: ",data)
            setError("");
            if (data.username === currentUser.user.username) {
              setError("me");
            }
          });
        } else {
          res.json().then((err) => {
            setError(err);
          });
        }
      });
    }
  }

  return (
    <div>
      {currentUser.user ? (
        <>
          <Container>
            <Row>
              <Col xs={12} lg={2} flex>
                <ProfileUserDetail
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  userActivity={userActivity}
                />
              </Col>

              <Col xs={8}>
                <UserAnalytics
                  userActivity={userActivity}
                  userIsFollowing={userIsFollowing}
                  usersFollowingYou={usersFollowingYou}
                  currentUser={currentUser}
                />

                <UsersYouFollow userIsFollowing={userIsFollowing} />
                <Row>&nbsp;</Row>
                <UserFollowers usersFollowingYou={usersFollowingYou} />

                <FindUserForm
                  validated={validated}
                  handleUserSearchSubmit={handleUserSearchSubmit}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                {returnedUser !== false && error !== "me" ? (
                  <UserSearchReturnedUser
                    returnedUser={returnedUser}
                    currentUser={currentUser}
                    userIsFollowing={userIsFollowing}
                    setReturnedUser={setReturnedUser}
                  />
                ) : null}

                {error.message ? (
                  <div className="following-row">
                    <h3 className="page-subheading">
                      {error.message} Try searching again.
                    </h3>
                  </div>
                ) : null}
                {error === "me" ? (
                  <div className="following-row">
                    <h3 className="page-subheading">
                      You can't follow yourself. Even if you have the best taste
                      in podcasts.
                    </h3>
                  </div>
                ) : null}
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      ) : (
        <p>Please sign in or create an account.</p>
      )}
    </div>
  );
}

export default Profile;
