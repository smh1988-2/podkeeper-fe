import React from "react";
import Button from "react-bootstrap/Button";

function ProfileUserDetail({ currentUser, userIsFollowing, usersFollowingYou }) {
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
      <Button>Logout</Button>
    </div>
  );
}

export default ProfileUserDetail;
