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
    <div className="container">
      <h2>Enter Room ID and Username</h2>
      <input
        className="input"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      <input
        className="input"
        placeholder="Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button className="button" onClick={handleJoin}>Join Room</button>
      <br />
      <button className="button" onClick={generateRoomId}>Generate Room ID</button>
    </div>
  );
};

export default Home;
