import React from 'react';

function Home({ currentUser }) {

  return <div>
      {currentUser.user ? <h1>Welcome Home, {currentUser.user.username}.</h1> : <h1>Welcome Home.</h1> }
  </div>;
}

export default Home;
