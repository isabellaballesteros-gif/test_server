const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Store messages in memory (in a real app, you'd use a database)
const messages = [];

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get message history
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send message history to newly connected user
    socket.emit('messageHistory', messages);

    // Handle new messages
    socket.on('message', (data) => {
        const message = {
            id: Date.now(),
            username: data.username || 'Anonymous',
            message: data.message,
            timestamp: new Date().toISOString()
        };
        
        // Store message
        messages.push(message);
        
        // Keep only last 100 messages
        if (messages.length > 100) {
            messages.shift();
        }
        
        // Broadcast message to all connected clients
        io.emit('newMessage', message);
        console.log(`Message from ${message.username}: ${message.message}`);
    });

    // Handle user typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('userTyping', {
            username: data.username || 'Someone',
            isTyping: data.isTyping
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});

