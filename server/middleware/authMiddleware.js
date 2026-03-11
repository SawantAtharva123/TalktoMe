const jwt = require('jsonwebtoken');

// This middleware runs before a protected route is accessed.
// It checks if a valid JWT token is sent in the Request Headers.
const protect = (req, res, next) => {
  // Extract token from 'Authorization: Bearer <token>'
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID to the request object so the next route can use it
    req.user = decoded.userId;
    next(); // Valid token, proceed to the requested route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
