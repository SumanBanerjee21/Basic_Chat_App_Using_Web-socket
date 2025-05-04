let username = '';
let ws;
const statusLight = document.getElementById('status-light');
const connectionText = document.getElementById('connection-text');
const usernameSetup = document.getElementById('username-setup');
const chatInterface = document.getElementById('chat-interface');
const usernameInput = document.getElementById('username-input');
const startChatBtn = document.getElementById('start-chat-btn');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const chatArea = document.getElementById('chat');

// Handle username setup
startChatBtn.addEventListener('click', () => {
    if (usernameInput.value.trim() !== '') {
        username = usernameInput.value.trim();
        usernameSetup.classList.add('hidden');
        chatInterface.classList.remove('hidden');
        connectWebSocket();
    } else {
        alert('Please enter a username');
    }
});

function connectWebSocket() {
    ws = new WebSocket('ws://127.0.0.1:8800');
    
    ws.onopen = () => {
        statusLight.classList.add('connected');
        connectionText.textContent = 'Connected';
        addSystemMessage('Connected to chat server!');
        
        // Send a join message
        ws.send(JSON.stringify({
            type: 'join',
            username: username
        }));
    };
    
    ws.onclose = () => {
        statusLight.classList.remove('connected');
        connectionText.textContent = 'Disconnected';
        addSystemMessage('Disconnected from server. Trying to reconnect...');
        
        // Try to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        addSystemMessage('Error connecting to the server.');
    };
    
    ws.onmessage = (event) => {
        try {
            // Try to parse as JSON first
            const data = JSON.parse(event.data);
            handleMessage(data);
        } catch (e) {
            // Handle legacy string format
            const messageText = event.data;
            
            if (messageText.startsWith('Client:')) {
                addClientMessage(messageText.substring(7).trim());
            } else if (messageText.startsWith('Server:')) {
                addServerMessage(messageText.substring(7).trim());
            } else {
                addSystemMessage(messageText);
            }
        }
    };
}

function handleMessage(data) {
    switch (data.type) {
        case 'user_message':
            if (data.username === username) {
                addClientMessage(data.message, data.username);
            } else {
                addServerMessage(data.message, data.username);
            }
            break;
        case 'system':
            addSystemMessage(data.message);
            break;
        case 'join':
            addSystemMessage(`${data.username} joined the chat!`);
            break;
        case 'leave':
            addSystemMessage(`${data.username} left the chat.`);
            break;
        default:
            console.log('Unknown message type:', data);
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addClientMessage(message, user = username) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-client';
    messageDiv.innerHTML = `
        <div>
            <div class="client-message">
                ${message}
                <div class="time-stamp">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    chatArea.appendChild(messageDiv);
    scrollToBottom();
}

function addServerMessage(message, user = 'Server') {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-server';
    messageDiv.innerHTML = `
        <div>
            <div class="server-message">
                <strong>${user}:</strong> ${message}
                <div class="time-stamp">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    chatArea.appendChild(messageDiv);
    scrollToBottom();
}

function addSystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = message;
    chatArea.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && ws.readyState === WebSocket.OPEN) {
        // Send as JSON format
        ws.send(JSON.stringify({
            type: 'user_message',
            username: username,
            message: message
        }));
        
        // We don't add the message to UI here, we'll wait for the server to echo it back
        messageInput.value = '';
    }
}

function addEmoji(emoji) {
    messageInput.value += emoji;
    messageInput.focus();
}

// Enter key to send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mobile viewport adjustments
function adjustViewportForMobile() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportForMobile);
adjustViewportForMobile();