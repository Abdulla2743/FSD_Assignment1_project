const jwt = require('jsonwebtoken');
const SECRET_KEY = 'jkldfvhiilas1264@';

const auth = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded token data (like email) to req.user
        next(); // Move to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ error: 'Invalid token, authorization denied' });
    }
};

module.exports = auth;
