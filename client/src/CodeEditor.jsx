import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import './styles.css';

const CodeEditor = ({ roomId, username }) => {
  const [code, setCode] = useState('// Welcome to CodeCollab!');
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('cpp');
  const socketRef = useRef(null);

  const handleChange = (value) => {
    setCode(value);
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('send_code', { roomId, code: value });
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000');
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_room', roomId);
      socket.emit('join_user', { roomId, username });
    });

    socket.on('receive_code', (data) => {
      setCode((prevCode) => (data !== prevCode ? data : prevCode));
    });

    socket.on('user_joined', (name) => {
      setMessages((prev) => [...prev, `${name} joined the room.`]);
    });

    socket.on('user_left', (name) => {
      setMessages((prev) => [...prev, `${name} left the room.`]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  return (
    <div className="editor-layout">
      <div className="editor-container">
        <div className="language-selector-container">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            className="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <Editor
          height="calc(100vh - 45px)"
          language={language}
          theme="vs-light"
          value={code}
          onChange={handleChange}
        />
      </div>
      <div className="activity-sidebar">
        <h3>Room Activity</h3>
        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="no-activity-text">No activity yet</p>
          ) : (
            messages.map((msg, i) => <p key={i} className="activity-message">{msg}</p>)
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;