// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      data: [],
      message: "401 Unauthorized - No token provided"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired, please log in again" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};
export default {
  verifyToken
};