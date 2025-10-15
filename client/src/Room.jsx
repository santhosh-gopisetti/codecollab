import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  return (
    <CodeEditor roomId={roomId} username={username} />
  );
};

export default Room;
