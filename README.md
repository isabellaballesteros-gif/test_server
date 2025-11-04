# Chat Server Website

A real-time chat server built with Node.js, Express, and Socket.IO that allows multiple users to message each other.

## Features

- 💬 Real-time messaging between users
- 👤 Username-based identification
- 📜 Message history (last 100 messages)
- ⌨️ Typing indicators
- 🎨 Modern, responsive UI

## Setup Instructions

1. **Install Node.js** (if you haven't already)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Navigate to the project folder**
   ```
   cd C:\Users\lilmi\OneDrive\Documents\server_website
   ```

3. **Install dependencies**
   ```
   npm install
   ```

4. **Start the server**
   ```
   npm start
   ```

5. **Open your browser**
   - Go to: http://localhost:3000
   - Enter a username and start chatting!

## Testing with Multiple Users

To test the chat with multiple users:
1. Open http://localhost:3000 in multiple browser tabs or windows
2. Each tab/window can have a different username
3. Messages sent from one user will appear in real-time for all other users

## What's Included

- `server.js` - Main server file with Socket.IO for real-time communication
- `public/index.html` - Chat interface
- `package.json` - Project configuration and dependencies

## How It Works

- Messages are stored in memory (last 100 messages)
- New users receive the message history when they connect
- All users see new messages in real-time via WebSocket connections
- Typing indicators show when someone is typing

## Customization

- Edit `public/index.html` to change the chat interface design
- Modify `server.js` to add features like:
  - User authentication
  - Private messaging
  - File sharing
  - Message persistence (database)

## Stopping the Server

Press `Ctrl+C` in the command prompt to stop the server.

