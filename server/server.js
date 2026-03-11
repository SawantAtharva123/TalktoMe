const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Initialize the Express app
const app = express();

// Middleware
// cors allows the React frontend to communicate with this backend API
app.use(cors());
// express.json() parses incoming JSON requests so we can read req.body
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Chatbot API is running...');
});

// Import Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
