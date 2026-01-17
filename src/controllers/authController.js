// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { logApiAccess, logApiStart } from '../utils/apiLogger.js';

const SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.json({
      status: true,
      data: { id: user.id, username: user.username },
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};

export const login = async (req, res) => {
  logApiStart(req);
  
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      const errorResponse = {
        status: false,
        data: [],
        message: "Invalid credentials"
      };
      
      res.status(401).json(errorResponse);
      
      // Log failed login attempt
      await logApiAccess(req, res, null, { message: "User not found" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const errorResponse = {
        status: false,
        data: [],
        message: "Invalid credentials"
      };
      
      res.status(401).json(errorResponse);
      
      // Log failed login attempt
      await logApiAccess(req, res, null, { message: "Invalid password" });
      return;
    }

    user.tokenVersion += 1;
    await user.save();

    const token = jwt.sign({ id: user.id, username: user.username, tokenVersion: user.tokenVersion }, SECRET, { expiresIn: "1h" });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/'
    });
    res.json({
      status: true,
      data: { token },
      message: "Login successful"
    };
    
    res.json(successResponse);
    
    // Log successful login
    await logApiAccess(req, res, { 
      loginSuccess: true, 
      userId: user.id, 
      tokenVersion: user.tokenVersion 
    });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log login error
    await logApiAccess(req, res, null, err);
  }
};

export const logout = async (req, res) => {
  logApiStart(req);
  
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    const successResponse = {
      status: true,
      data: [],
      message: 'Logged out successfully'
    };
    
    res.json(successResponse);
    
    // Log successful logout
    await logApiAccess(req, res, { logoutSuccess: true });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log logout error
    await logApiAccess(req, res, null, err);
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    res.json({
      status: true,
      data: [],
      message: 'Logged out successfully'
    });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log login error
    await logApiAccess(req, res, null, err);
  }
};

export const logout = async (req, res) => {
  logApiStart(req);
  
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    const successResponse = {
      status: true,
      data: [],
      message: 'Logged out successfully'
    };
    
    res.json(successResponse);
    
    // Log successful logout
    await logApiAccess(req, res, { logoutSuccess: true });
    
  } catch (err) {
    const errorResponse = {
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    };
    
    res.status(500).json(errorResponse);
    
    // Log logout error
    await logApiAccess(req, res, null, err);
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    res.json({
      status: true,
      data: [],
      message: 'Logged out successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: `500 Internal Server Error: ${err.message}`
    });
  }
};