exports.requireSignin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token from "Bearer <token>" format
        const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Verify the token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        // Add user info to request object
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
            error: error.message
        });
    }
}
