import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EpisodeMainPage from "./components/Podcasts/EpisodeMainPage";
import Forms from "./components/User/Forms";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MyPodcasts from "./components/MyPodcasts/MyPodcasts";
import PodcastDetail from "./components/Podcasts/PodcastDetail";
import Search from "./components/Search/Search";
import Profile from "./components/User/Profile";
import RouteChangeTracker from "./RouteChangeTracker";

import ReactGA from 'react-ga';


import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const TRACKING_ID = "UA-220526160-1";
ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCurrentUser(data);
        });
    }
  }, []);

  return (
    <div className="App g-0">
      <Header currentUser={currentUser} />

      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/home" element={<Home currentUser={currentUser} />} />

        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/my-podcasts"
          element={<MyPodcasts currentUser={currentUser} />}
        />

        <Route
          path="/login"
          element={
            <Forms setCurrentUser={setCurrentUser} currentUser={currentUser} />
          }
        />
        <Route path="/search" element={<Search currentUser={currentUser} />} />
        <Route
          path="/podcasts/:id"
          element={<PodcastDetail currentUser={currentUser} />}
        />
        <Route
          path="/episodes/:id"
          element={<EpisodeMainPage currentUser={currentUser} />}
        />
      </Routes>

      {/* <RouteChangeTracker /> */}
    </div>
  );
}

export default App;
