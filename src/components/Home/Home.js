import React from "react";
import { useState, useEffect } from "react";
import HomePageWelcomeMessage from "./HomePageWelcomeMessage";
import HomeNoActivityMessage from "./HomeNoActivityMessage";
import UserActivityContainer from "./UserActivityContainer";
import Loading from "./Loading";

function Home({ currentUser }) {
  const [userActivity, setUserActivity] = useState([]);
  const [userFriendActivity, setUserFriendActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // get the activity for the current user
  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`http://localhost:3000/my-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserActivity(data);
          //console.log("user activity data is: ", data);
        });
    }
  }, [loading]);

  // get the activity for the current user's friends. combine with above?
  useEffect(() => {
    if (token && currentUser.user) {
      fetch(`http://localhost:3000/friend-activity/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUserFriendActivity(data);
          console.log("friend data is: ", data);
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
  const activityArray = [];
  userFriendActivity.map((user) => {
    if (user.length > 0) {
      return user.map((user_activity) => {
        activityArray.push(user_activity);
      });
    }
  });

  activityArray.sort(function (a, b) {
    return a.id - b.id;
  });
  console.log(activityArray);

  return (
    <div>
      {/* take the useEffect with it? */}
      {/* <FriendActivity
        userFriendActivity={userFriendActivity}
        handleDate={handleDate}
      /> */}

      {!loading && userActivity.length > 0 ? (
        <>
        {/* Current user's activity */}
          <UserActivityContainer
            userActivity={userActivity}
            handleDate={handleDate}
            type={"subscription"}
            headerText={"subscriptions"}
          />
          <UserActivityContainer
            userActivity={userActivity}
            handleDate={handleDate}
            type={"listened"}
            headerText={"episodes"}
          />
          <UserActivityContainer
            userActivity={userActivity}
            handleDate={handleDate}
            type={"episode-rating"}
            headerText={"episode ratings"}
          />
          <UserActivityContainer
            userActivity={userActivity}
            handleDate={handleDate}
            type={"podcast-rating"}
            headerText={"podcast ratings"}
          />


          {/* Friend's activity */}

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"subscription"}
            headerText={"friend's subscriptions"}
          />

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"listened"}
            headerText={"friend's episodes"}
          />

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"episode-rating"}
            headerText={"friend's episode ratings"}
          />

          <UserActivityContainer
            userActivity={activityArray}
            handleDate={handleDate}
            type={"podcast-rating"}
            headerText={"friend's podcast ratings"}
          />
        </>
      ) : null}

      {!loading &&
      userActivity.length === 0 &&
      currentUser.user &&
      userFriendActivity.length === 0 ? (
        <HomeNoActivityMessage currentUser={currentUser} />
      ) : null}

      {currentUser.user ? <Loading loading={loading} /> : null}

      {currentUser.user ? null : (
        <HomePageWelcomeMessage currentUser={currentUser} />
      )}
    </div>
  );
}

export default Home;
