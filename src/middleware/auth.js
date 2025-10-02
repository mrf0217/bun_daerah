// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(" ")[1];
    const cookieToken = req.cookies && req.cookies.token;
    const token = cookieToken || bearerToken;

    console.log('🔍 Token verification:', { 
      hasToken: !!token, 
      tokenLength: token ? token.length : 0,
      fromCookie: !!cookieToken,
      fromHeader: !!bearerToken
    });

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({
        status: false,
        data: [],
        message: "401 Unauthorized - No token provided"
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT verified:', { id: decoded.id, tokenVersion: decoded.tokenVersion });
    
    // Check if token version matches current user's version
    const user = await User.findByPk(decoded.id);
    console.log('👤 User found:', { 
      userId: user?.id, 
      currentTokenVersion: user?.tokenVersion, 
      tokenVersion: decoded.tokenVersion 
    });
    
    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      console.log('❌ Token version mismatch - token invalidated');
      return res.status(401).json({ 
        status: false,
        data: [],
        message: "Token invalidated - please log in again" 
      });
    }

    console.log('✅ Token valid - proceeding');
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Token verification error:', err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        status: false,
        data: [],
        message: "Session expired, please log in again" 
      });
    }
    return res.status(403).json({ 
      status: false,
      data: [],
      message: "Invalid token" 
    });
  }
};
export default {
  verifyToken
};