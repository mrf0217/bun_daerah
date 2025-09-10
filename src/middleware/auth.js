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

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return res.status(403).json({ status: false, data: [], message: "403 Forbidden - Token invalid or replaced" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ status: false, data: [], message: "403 Forbidden - Token expired or invalid" });
  }
};