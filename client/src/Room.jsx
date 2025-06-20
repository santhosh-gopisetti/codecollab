import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username || 'Anonymous';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CodeEditor roomId={roomId} username={username} />
    </div>
  );
};

export default Room;
