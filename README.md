# TalktoMe
TalkToMe 🤖💬

TalkToMe is a simple AI chatbot web application that allows users to interact with an AI assistant through a clean chat interface. The application sends user messages to an AI model and displays the generated responses in real time.

This project was built using the MERN ecosystem and modern web technologies to demonstrate how conversational AI can be integrated into a web application.

🚀 Features

💬 Real-time chatbot conversation

🤖 AI-generated responses

🖥️ Clean and responsive chat interface

🔄 Dynamic message rendering

⏳ Loading state while waiting for AI response

📱 Simple UI for easy interaction

🛠️ Tech Stack

Frontend

React.js

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js

AI Integration

Gemini API (Google Generative AI)

Other Tools

Axios

REST APIs

📂 Project Structure
TalktoMe
│
├── client
│   ├── components
│   │   ├── ChatWindow.jsx
│   │   ├── MessageBubble.jsx
│   │
│   ├── styles
│   │   ├── chat.css
│
├── server
│   ├── routes
│   ├── controllers
│   ├── index.js
│
├── package.json
└── README.md
⚙️ Installation

Clone the repository:

git clone https://github.com/SawantAtharva123/TalktoMe.git

Move into the project directory:

cd TalktoMe

Install dependencies:

npm install

Start the development server:

npm start
🔑 Environment Variables

Create a .env file in the root directory and add:

GEMINI_API_KEY=your_api_key_here
💡 How It Works

User types a message in the chat interface.

The message is sent to the backend API.

Backend forwards the request to the AI model.

AI generates a response.

Response is sent back and displayed in the chat window.

🎯 Purpose of the Project

This project was created to:

Learn AI integration in web applications

Understand frontend-backend communication

Practice building real-time interactive UIs

Experiment with LLM-powered chatbots

📌 Future Improvements

Voice input support 🎤

Chat history storage 🗂️

User authentication 🔐

Better conversation context handling

Deployment on cloud platforms ☁️

👨‍💻 Author

Atharva Sawant

GitHub:
https://github.com/SawantAtharva123
