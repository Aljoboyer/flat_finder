const jwt = require('jsonwebtoken');

const verifyJWT = (options = {}) => {
  return (req, res, next) => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const secret = process.env.SECRETKEY || 'your-default-secret';

      // Verify token
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Optionally filter by role
        if (options.roles && !options.roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Forbidden: You do not have permission' });
        }

        // Attach decoded token to request
        req.user = decoded;
        next();
      });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = verifyJWT;
