import Forms from './components/User/Forms';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import PodcastDetail from './components/Podcasts/PodcastDetail';

import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [currentUser, setCurrentUser] = useState({})

  return (
    <div className="App g-0">
      <Header currentUser={currentUser} />

      <Routes>
        <Route path="/login" element={<Forms setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        <Route path="/search" element={<Search setCurrentUser={setCurrentUser} currentUser={currentUser} />} />
        <Route path="/podcasts/:id" element={<PodcastDetail currentUser={currentUser} />}
        />
      </Routes>
      
    </div>
  );
}

export default App;
