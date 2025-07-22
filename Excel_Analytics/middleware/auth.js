// protecting routes

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied' });
  }

  // Extract token from "Bearer TOKEN" format
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // Check if it's a mock token for demo purposes
    if (token.startsWith('demo_token_')) {
      // Create a mock user for demo tokens
      req.user = {
        id: 'demo_user_123',
        role: 'user'
      };
      return next();
    }
    
    // Verify real JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(400).json({ error: 'Invalid token' });
  }
}; 