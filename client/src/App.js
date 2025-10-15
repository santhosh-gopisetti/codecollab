import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Room from './Room';
<<<<<<< HEAD
=======
import './styles.css';
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
=======
      <div className="app-container">
        <header className="app-header">
          <h1>CodeCollab</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
