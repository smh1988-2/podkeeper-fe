import React from "react";
import { useState, useEffect } from "react";
import HomePageWelcomeMessage from "./HomePageWelcomeMessage";
import HomeNoActivityMessage from "./HomeNoActivityMessage";
import UserSubscriptionActivity from "./UserSubscriptionActivity";
import UserEpisodeActivity from "./UserEpisodeActivity";
import UserRatingActivity from "./UserRatingActivity";
import UserEpisodeRatingActivity from "./UserEpisodeRatingActivity";
import Loading from "./Loading";

import env from "react-dotenv";

function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);
  const [userFriendActivity, setUserFriendActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // get the activity for the current user
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
          console.log("user activity data is: ", data);
        });
    }
  }, [loading]);

  // get the activity for the current user's friends. combine with above?
  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`${env.API_URL}/friend-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserFriendActivity(data);
          console.log("data is: ", data);
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


      {/* move to new component. take the useEffect with it? */}
      {/* {!loading && userActivity.length > 0 && userFriendActivity.length > 0 ? (
        <>
          {userFriendActivity.map((user) => {
            return user.map((act) => {
              return (
                <p>
                  {act.user.username} did something with{" "}
                  {act.podcast.collectionName}
                </p>
              );
            });
          })}
        </>
      ) : (
        null
      )} */}

      {!loading && userActivity.length > 0 ? (
        <>
          <UserEpisodeActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
          <UserEpisodeRatingActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
          <UserRatingActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
          <UserSubscriptionActivity
            userActivity={userActivity}
            handleDate={handleDate}
          />
        </>
      ) : null}

      {!loading && userActivity.length === 0 && currentUser.user && userFriendActivity.length === 0 ? (
        <HomeNoActivityMessage currentUser={currentUser} />
      ) : 
      // needs to be hid behind a loading spinner too...
      <>
      {userFriendActivity.map((user) => {
        return user.map((act) => {
          return (
            <p>
              {act.user.username} did somefdgsdfgdfgthing with{" "}
              {act.podcast.collectionName}
            </p>
          );
        });
      })}
      </>
      }

      {currentUser.user ? <Loading loading={loading} /> : null}

      {currentUser.user ? null : (
        <HomePageWelcomeMessage currentUser={currentUser} />
      )}
    </div>
  );
}

export default Home;
