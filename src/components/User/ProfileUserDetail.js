import React from "react";
import Button from "react-bootstrap/Button";

function ProfileUserDetail({ currentUser, userIsFollowing }) {
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
        Followed by: Y
      </p>
      <Button>Logout</Button>
    </div>
  );
}

export default ProfileUserDetail;
