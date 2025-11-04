const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);

// Configure Socket.IO to allow connections from any origin
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

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
            avatar: data.avatar || '👤',
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

// Get network IP addresses
function getNetworkIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    
    return addresses;
}

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Server is running!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`\nLocal access:`);
    console.log(`  http://localhost:${PORT}`);
    
    const networkIPs = getNetworkIPs();
    if (networkIPs.length > 0) {
        console.log(`\nNetwork access (from other devices):`);
        networkIPs.forEach(ip => {
            console.log(`  http://${ip}:${PORT}`);
        });
    } else {
        console.log(`\nNetwork IP address not found. Make sure you're connected to a network.`);
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Press Ctrl+C to stop the server\n`);
});

