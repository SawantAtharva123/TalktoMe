const mongoose = require('mongoose');

// A Schema acts as a blueprint for how user data is stored in the database.
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Ensures no two users can have the same email
  },
  password: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the model so we can use it to query the database
module.exports = mongoose.model('User', userSchema);
