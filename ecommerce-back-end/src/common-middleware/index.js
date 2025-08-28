const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({
                message: 'Authorization token required'
            });
        }

        // Extract token from "Bearer <token>" format
        const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Debug: Log the token parts
        console.log('Full token:', bearerToken);
        console.log('Token parts count:', bearerToken.split('.').length);
        
        // Verify the token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        // Add user info to request object
        req.user = decoded;
        
        next();
    } catch (error) {
        console.log('JWT Error:', error.message);
        return res.status(401).json({
            message: 'Invalid token',
            error: error.message
        });
    }
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({
            message: 'User access denied'
        });
    }
    next();
    
}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({
            message: 'Admin access denied'
        });
    }
    next();

}