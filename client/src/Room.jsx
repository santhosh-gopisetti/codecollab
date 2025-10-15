import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
<<<<<<< HEAD
  const username = location.state?.username || 'Guest';

  return (
    <CodeEditor roomId={roomId} username={username} />
  );
};

export default Room;
=======
  const username = location.state?.username || 'Anonymous';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CodeEditor roomId={roomId} username={username} />
    </div>
  );
};

export default Room;
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
