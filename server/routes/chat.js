const express = require('express');
const router = express.Router();
const axios = require('axios');
const protect = require('../middleware/authMiddleware');

// POST /api/chat
// Protected route: Receives message and sends it to Gemini API
router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Construct the Gemini API request
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [{
        parts: [{ text: message }]
      }]
    };

    // Make request via Axios to Gemini
    const response = await axios.post(geminiUrl, requestBody);
    
    // Extract the text response from the Gemini payload
    const botResponse = response.data.candidates[0].content.parts[0].text;
    
    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Gemini API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to communicate with AI Chatbot' });
  }
});

module.exports = router;
