import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProfileUserDetail({ currentUser, userIsFollowing, usersFollowingYou, setCurrentUser }) {
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    setCurrentUser({})
  }

  return (
    <div>
      <img
        id="profile-page-pic"
        src={currentUser.user.profile_pic}
        alt={currentUser.user.username}
      />
      <h3 id="profile-page-subheading">{currentUser.user.username}</h3>
      <p>
        Following: {userIsFollowing.length}
        <br />
        Followed by: {usersFollowingYou.length}
      </p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default ProfileUserDetail;
