const WebSocket = require('ws');
const readline = require('readline');

const wss = new WebSocket.Server({ host: '127.0.0.1', port: 8800 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.send('Welcome to the WebSocket chat server!');

    ws.on('message', (message) => {
        try {
            // Try to parse as JSON
            const data = JSON.parse(message);
            console.log(`Received: ${JSON.stringify(data)}`);
            
            // Broadcast the message to all clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        } catch (e) {
            // Handle as plain text if not JSON
            console.log(`Client: ${message}`);
            
            // Broadcast the message to all clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`Client: ${message}`);
                }
            });
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});

// Setup terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read messages from the terminal and send them to all clients
rl.on('line', (input) => {
    console.log(`Server: ${input}`);

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`Server: ${input}`);
        }
    });
});

console.log('WebSocket server running on ws://127.0.0.1:8800');
console.log('Type messages in the terminal to send to clients.');