// src/utils/apiLogger.js
import { ApiLog } from '../models/index.js';

export const logApiAccess = async (req, res, responseData = null, error = null) => {
  try {
    const user = req.user || { id: null, username: 'anonymous' };
    
    // Prepare payload string (max 255 characters as per your table structure)
    let payloadStr = '';
    
    // For GET requests, include query parameters
    if (req.method === 'GET' && Object.keys(req.query).length > 0) {
      payloadStr = `query: ${JSON.stringify(req.query)}`;
    }
    // For POST/PUT requests, include body
    else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      payloadStr = `body: ${JSON.stringify(req.body)}`;
    }
    // For requests with response data, include response info
    else if (responseData) {
      payloadStr = `response: ${JSON.stringify(responseData)}`;
    }
    // For errors, include error info
    else if (error) {
      payloadStr = `error: ${error.message || 'Unknown error'}`;
    }
    // Default payload
    else {
      payloadStr = `method: ${req.method}`;
    }
    
    // Truncate payload to fit in 255 character limit
    if (payloadStr.length > 255) {
      payloadStr = payloadStr.substring(0, 252) + '...';
    }

    // Save to your existing database table
    await ApiLog.create({
      username: user.username || 'anonymous',
      waktu: new Date(),
      endpoint: req.originalUrl,
      payload: payloadStr
    });

    // Also log to console for immediate feedback
    const logLevel = res.statusCode >= 400 ? '❌' : '✅';
    const logMessage = `${logLevel} [API LOG] ${req.method} ${req.originalUrl} - User: ${user.username || 'anonymous'} - Status: ${res.statusCode}`;
    console.log(logMessage);

  } catch (logError) {
    console.error('Failed to save API log to database:', logError.message);
  }
};

export const logApiStart = (req) => {
  req.startTime = Date.now();
};
