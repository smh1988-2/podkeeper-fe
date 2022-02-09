import React from "react";
import { useState } from "react";
import env from "react-dotenv";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Signup({ setCurrentUser, currentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  function handleSignupSubmit(e) {
    e.preventDefault();
    fetch(`${env.API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
    localStorage.setItem("token", data.include[0].jwt);
    // console.log(token)
    setError("");
    //console.log(data)
    setCurrentUser(data);
    navigate("/");
        });
      } else {
        r.json().then((err) => {
          console.log(err)
          setCurrentUser({})
            setError(err);
        });
      }
    });
  }

  return (
    <div>
      <Form onSubmit={handleSignupSubmit} id="signup-form">
        <Form.Group className="mb-3" controlId="signup-username">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signup-password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="global-button">
          Sign up
        </Button>
      </Form>

      {error ? (
        <p>Incorrect username or password. Please try again or sign up.</p>
      ) : null}

      {currentUser.user ? (
        <p>
          You are logged in as {currentUser.user.username}.</p>
      ) : null}
    </div>
  );
}

export default Signup;


  // .then((resp) => resp.json())
      // .then((data) => {
      //   // console.log("data.jwt is: ", data.jwt)
      //   // console.log("data.user is: ", data.user)
      //   // console.log("data from signup is: ", data)
      //   localStorage.setItem("token", data.jwt);
      //   setError("");
      //   setCurrentUser(data.user);
      //   navigate("/");
      // });
