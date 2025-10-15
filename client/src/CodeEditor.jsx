import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
<<<<<<< HEAD
import './styles.css';

const CodeEditor = ({ roomId, username }) => {
  const [code, setCode] = useState('// Welcome to CodeCollab!');
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('cpp');
=======

const CodeEditor = ({ roomId, username }) => {
  const [code, setCode] = useState('// Start typing...');
  const [messages, setMessages] = useState([]);
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
  const socketRef = useRef(null);

  const handleChange = (value) => {
    setCode(value);
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('send_code', { roomId, code: value });
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000');
=======
    const socket = io(process.env.REACT_APP_BACKEND_URL);
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_room', roomId);
      socket.emit('join_user', { roomId, username });
    });

    socket.on('receive_code', (data) => {
<<<<<<< HEAD
      setCode((prevCode) => (data !== prevCode ? data : prevCode));
=======
      if (data !== code) {
        setCode(data);
      }
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
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
<<<<<<< HEAD
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
=======
  }, [roomId, username]); // username can stay, but not code

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100vh"
          language="cpp"
          theme="light"
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
          value={code}
          onChange={handleChange}
        />
      </div>
<<<<<<< HEAD
      <div className="activity-sidebar">
        <h3>Room Activity</h3>
        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="no-activity-text">No activity yet</p>
          ) : (
            messages.map((msg, i) => <p key={i} className="activity-message">{msg}</p>)
          )}
        </div>
=======
      <div
        style={{
          width: '250px',
          backgroundColor: '#f9fafb',
          borderLeft: '1px solid #e5e7eb',
          padding: '10px',
          overflowY: 'auto',
          fontSize: '14px',
        }}
      >
        <h3 style={{ color: '#2563eb' }}>Room Activity</h3>
        {messages.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No activity yet</p>
        ) : (
          messages.map((msg, i) => <p key={i}> {msg}</p>)
        )}
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CodeEditor;
=======
export default CodeEditor;
>>>>>>> c888356068aa0c9eef9b7afc7a7548278292c2c4
