import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token from HTTP-only cookie
 * Protects routes that require authentication
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }

    // Verify the token
    // Supabase JWTs are signed with the JWT_SECRET from your Supabase project
    // verify and decode it to get the user information
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        error: 'Invalid token.' 
      });
    }

    // To check if token is expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ 
        error: 'Token expired.' 
      });
    }

    // Attach user info to request object
    req.user = {
      id: decoded.sub,
      email: decoded.email
    };

    // Store the token for Supabase client
    req.token = token;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      error: 'Invalid token.' 
    });
  }
};
