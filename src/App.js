import Forms from './components/User/Forms';
import Header from './components/Header/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const [currentUser, setCurrentUser] = useState({})

  return (
    <div className="App g-0">
      <Header currentUser={currentUser} />
      <Forms setCurrentUser={setCurrentUser} currentUser={currentUser} />
    </div>
  );
}

export default App;
