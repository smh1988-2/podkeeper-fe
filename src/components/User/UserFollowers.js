import React from 'react';

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function UserFollowers({ usersFollowingYou }) {
  return <div>
      
  {usersFollowingYou.length > 0 ? (
    <div className="following-row">
      <h3 className="page-subheading">Followers</h3>

      <Container>
    <Row
      xs={2}
      md={4}
      className="g-4"
      className="d-flex justify-content-left"
    >
      {usersFollowingYou.map((user) => {
        return (
          <div key={user.id}>
            <Card style={{ width: "7rem", border: "0px" }} key={user.id} className="profile-page-card">
            <div className="circle-follow">{user.username}</div>
            
            </Card>
          </div>
        );
      })}
      </Row>
  </Container>
    </div>
  ) : (
    null
  )}
  
</div>;
}

export default UserFollowers;
