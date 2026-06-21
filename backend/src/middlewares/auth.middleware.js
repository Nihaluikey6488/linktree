import jwt from 'jsonwebtoken';

// Authentication middleware
// Looks for a JWT in the `token` cookie or the `Authorization: Bearer <token>` header.
// On success attaches the decoded token payload to `req.user`.
// On failure returns 401 Unauthorized.
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decoded shape: { id, email, username }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
};