import React from "react";
import { useState, useEffect } from "react";
import HomePageWelcomeMessage from "./HomePageWelcomeMessage";
import UserSubscriptionActivity from "./UserSubscriptionActivity";
import UserEpisodeActivity from "./UserEpisodeActivity";
import UserRatingActivity from "./UserRatingActivity";
import UserEpisodeRatingActivity from "./UserEpisodeRatingActivity";
import Loading from "./Loading";

import env from "react-dotenv";


function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`${env.API_URL}/my-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          // console.log("data is: ",data);
        });
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  function handleDate(date) {
    if (date === null) {
      return date;
    } else {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    }
  }

  return (
    <div>
      {/* {currentUser.user && !loading ? (
        <h1>Welcome Home, {currentUser.user.username}.</h1>
      ) : null} */}

      {!loading && userActivity.length > 0 ? (
        <>
          <UserSubscriptionActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />

          <UserEpisodeActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />

          <UserRatingActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />

\          <UserEpisodeRatingActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
        </>
      ) : null}

      {currentUser.user ? <Loading loading={loading} /> : null}

      {currentUser.user ? null : (
        <HomePageWelcomeMessage currentUser={currentUser} />
      )}
    </div>
  );
}

export default Home;
