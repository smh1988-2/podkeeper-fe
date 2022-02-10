import React from "react";
import { useState, useEffect } from "react";
import env from "react-dotenv";

import ProfileUserDetail from "./ProfileUserDetail";
import FindUserForm from "./FindUserForm";
import UserSearchReturnedUser from "./UserSearchReturnedUser";
import UsersYouFollow from "./UsersYouFollow";
import UserFollowers from "./UserFollowers";

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

  useEffect(() => {
    if (currentUser.user) {
      fetch(`${env.API_URL}/following/${currentUser.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          setUserIsFollowing(res);
          console.log("user is following: ", res)
        });
    }
  }, [returnedUser, currentUser]);

  useEffect(() => {
    if (currentUser.user) {
      fetch(`${env.API_URL}/followers/${currentUser.user.id}`)
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
      fetch(`${env.API_URL}/user-search/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setReturnedUser(data);
            console.log("returned user is: ",data)
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
              <Col>
                <ProfileUserDetail
                  currentUser={currentUser}
                  userIsFollowing={userIsFollowing}
                  usersFollowingYou={usersFollowingYou}
                  setCurrentUser={setCurrentUser}
                />
              </Col>

              <Col xs={8}>
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                <FindUserForm
                  validated={validated}
                  handleUserSearchSubmit={handleUserSearchSubmit}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                {returnedUser !== false && error !== "me" ? (
                  <UserSearchReturnedUser
                    returnedUser={returnedUser}
                    currentUser={currentUser}
                    userIsFollowing={userIsFollowing}
                    setReturnedUser={setReturnedUser}
                  />
                ) : null}

                {error.message ? <p>{error.message}</p> : null}
                {error === "me" ? (
                  <p>
                    You can't follow yourself. Even if you have the best taste
                    in podcasts.
                  </p>
                ) : null}

                <UsersYouFollow userIsFollowing={userIsFollowing} />
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                <UserFollowers usersFollowingYou={usersFollowingYou} />
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
