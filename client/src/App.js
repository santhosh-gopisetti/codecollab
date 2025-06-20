import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Room from './Room';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>CodeCollab</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
