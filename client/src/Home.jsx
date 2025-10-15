import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleJoin = () => {
    if (!roomId || !username) {
      alert('Enter both room ID and username');
      return;
    }
    navigate(`/room/${roomId}`, { state: { username } });
  };

  const generateRoomId = () => {
    const id = uuidv4().slice(0, 8);
    setRoomId(id);
  };

  return (
    <div className="home-page-background">
      <div className="form-container">
        <h2>CodeCollab</h2>
        <input
          className="input-field"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn" onClick={handleJoin}>Join Room</button>
        <button className="btn" onClick={generateRoomId}>Generate Room ID</button>
      </div>
    </div>
  );
};

export default Home;