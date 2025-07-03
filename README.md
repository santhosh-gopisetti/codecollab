#  CodeCollab – Real-Time Collaborative Code Editor

**CodeCollab** is a real-time collaborative code editor that enables seamless live coding between multiple users with <100ms latency. Built with **React.js**, **Node.js**, **Express**, **Socket.IO**, and the **Monaco Editor**, it provides syntax highlighting, auto-completion, room-based sessions, and real-time feedback.

##  Live Demo

 [Click here to try CodeCollab](https://68554603ed2d0ec0fd858926--wonderful-kleicha-1d6176.netlify.app/)

---

##  Tech Stack

### Frontend
- React.js 
- **Monaco Editor** (for VS Code-like editing experience)
- CSS
- Socket.IO client

### Backend
- Node.js
- Express.js
- Socket.IO server
  

---

##  Features

-  Real-time collaborative code editing with <100ms latency
-  Join or create room-based coding sessions
-  Syntax highlighting and IntelliSense (via Monaco Editor)
-  Auto-completion and smooth syncing between users
-  Join/Leave user alerts 
-  Built with efficient WebSocket communication (Socket.IO)

---

##  How It Works

1. User enters their name and a room ID (or creates one).
2. The backend establishes a WebSocket connection using Socket.IO.
3. All code edits are broadcast instantly to everyone in the same room.
4. The Monaco Editor reflects real-time changes with syntax support.



