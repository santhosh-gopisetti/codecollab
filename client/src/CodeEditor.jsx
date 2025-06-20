import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';

const CodeEditor = ({ roomId, username }) => {
  const [code, setCode] = useState('// Start typing...');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const handleChange = (value) => {
    setCode(value);
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('send_code', { roomId, code: value });
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_room', roomId);
      socket.emit('join_user', { roomId, username });
    });

    socket.on('receive_code', (data) => {
      if (data !== code) {
        setCode(data);
      }
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
  }, [roomId, username]); // username can stay, but not code

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100vh"
          language="cpp"
          theme="light"
          value={code}
          onChange={handleChange}
        />
      </div>
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
          messages.map((msg, i) => <p key={i}>🔔 {msg}</p>)
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
