# ChatterBox - Real-time WebSocket Chat Application

![ChatterBox](https://img.shields.io/badge/ChatterBox-Live%20Chat-6a11cb?style=for-the-badge)
![WebSockets](https://img.shields.io/badge/WebSockets-Real--time-2575fc?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

A modern, real-time chat application built with WebSockets, providing a seamless and responsive communication experience. ChatterBox allows multiple users to connect to a central server and exchange messages in real-time.


## ✨ Features

- **Real-time Communication**: Instant message delivery using WebSockets
- **User-friendly Interface**: Modern, responsive design with smooth animations
- **Username-based Chat**: Personalized chat experience with usernames
- **Connection Status Indicator**: Visual feedback of connection status
- **Emoji Support**: Quick access to emojis to express yourself
- **Auto-reconnect**: Automatic reconnection attempts if connection is lost
- **Timestamps**: Each message displays the time it was sent
- **Server and Client Integration**: Complete client-server architecture
- **Terminal-based Server Messaging**: Send messages directly from the server terminal

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js
- **WebSockets**: Native WebSocket API (browser) and ws package (Node.js)
- **Real-time Protocol**: WebSocket (ws://)

## 📋 Prerequisites

- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)
- Modern web browser with WebSocket support

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SumanBanerjee21/Basic_Chat_App_Using_Web-socket.git
   cd chatterbox
   ```

2. **Install dependencies**
   ```bash
   npm install ws readline
   ```

### Running the Application

1. **Start the WebSocket server**
   ```bash
   node server.js
   ```
   The server will start on `ws://127.0.0.1:8800`

2. **Open the client application**
   - Open `index.html` in your web browser
   - Alternatively, serve it using a simple HTTP server:
     ```bash
     npx serve
     ```

3. **Start chatting**
   - Enter your username and click "Start Chatting"
   - The application will connect to the WebSocket server automatically
   - Send messages using the input field and Send button
   - Use emojis from the emoji picker

## 📁 Project Structure

```
chatterbox/
├── index.html      # Main HTML file with the application structure
├── style.css       # CSS styles for the chat interface
├── script.js       # Client-side JavaScript for handling WebSocket communication
├── server.js       # Node.js WebSocket server
└── README.md       # Project documentation
```

## 💻 How It Works

### WebSocket Server (`server.js`)

The server is built using Node.js and the `ws` library, providing the following functionality:

- Creates a WebSocket server on port 8800
- Handles client connections and disconnections
- Broadcasts messages to all connected clients
- Processes both plain text and JSON formatted messages
- Allows server administrators to send messages via terminal

```javascript
// Example of the WebSocket server handling connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    // ... handle messages and events
});
```

### Client Application

The client-side consists of three main components:

1. **HTML Structure (`index.html`)**
   - Provides the layout for the chat application
   - Contains user interface elements like message input, chat area, and emoji picker

2. **CSS Styling (`style.css`)**
   - Defines the visual appearance of the chat application
   - Implements responsive design for various screen sizes
   - Adds visual effects and animations

3. **Client-side JavaScript (`script.js`)**
   - Establishes and manages WebSocket connection
   - Handles sending and receiving messages
   - Updates the UI in response to messages and connection events

```javascript
// Example of establishing a WebSocket connection
function connectWebSocket() {
    ws = new WebSocket('ws://127.0.0.1:8800');
    // ... handle connection events
}
```

## 📢 WebSocket Communication Protocol

ChatterBox uses a simple protocol for communication:

### JSON Message Format

```javascript
{
    "type": "user_message", // Message type (user_message, join, leave, system)
    "username": "Suman",     // Sender's username
    "message": "Hello!"     // Message content
}
```

### Message Types

- **user_message**: Regular chat message from a user
- **join**: Notification when a user joins the chat
- **leave**: Notification when a user leaves the chat
- **system**: System notifications and announcements

### Legacy Format Support

For backward compatibility, the application also supports simple string messages:

- `Client: message` - Messages from clients
- `Server: message` - Messages from the server
- Other messages are treated as system notifications

## 🔧 Customization

### Changing the Server Address

By default, the server runs on `127.0.0.1:8800`. To change this:

1. Update the host and port in `server.js`:
   ```javascript
   const wss = new WebSocket.Server({ host: 'your-ip', port: your-port });
   ```

2. Update the WebSocket connection address in `script.js`:
   ```javascript
   ws = new WebSocket('ws://your-ip:your-port');
   ```

### Customizing the UI

You can easily customize the appearance by modifying the `style.css` file:

- Change color schemes by updating the gradient values
- Adjust chat bubble styles
- Modify animations and transitions
- Change font styles and sizes

## 📱 Mobile Support

ChatterBox is designed to be responsive and works well on mobile devices:

- Responsive layout adapts to different screen sizes
- Mobile-friendly input area
- Touch-friendly buttons and controls
- Viewport adjustments for better mobile experience

## 🔒 Security Considerations

- This is a basic implementation and doesn't include authentication or encryption
- For production use, consider adding:
  - Secure WebSockets (WSS) with SSL/TLS
  - User authentication
  - Input validation and sanitization
  - Rate limiting to prevent abuse

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

If you have any questions or feedback, please reach out to [indsumanttt2002@gmail.com](mailto:indsumanttt2002@gmail.com)

---

Built with ❤️ by Suman Banerjee

