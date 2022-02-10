import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProfileUserDetail({
  currentUser,
  userIsFollowing,
  usersFollowingYou,
  setCurrentUser,
}) {
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    setCurrentUser({});
  }

  return (
    <div>
      <div className="circle">{currentUser.user.username}</div>
      <p>
        Following: {userIsFollowing.length}
        <br />
        Followed by: {usersFollowingYou.length}
      </p>
      <Button onClick={handleLogout} className="global-button">
        Logout
      </Button>
    </div>
  );
}

export default ProfileUserDetail;
