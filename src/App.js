//import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//import express from 'express'

import env from "react-dotenv";

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

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${env.API_URL}/auto_login`, {
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
      <Route path="/" element={<Forms setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        <Route path="/home" element={<Home currentUser={currentUser} />} />

        <Route path="/profile" element={<Profile currentUser={currentUser} />} />

        <Route path="/my-podcasts" element={<MyPodcasts currentUser={currentUser} />} />

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
    </div>
  );
}

export default App;
