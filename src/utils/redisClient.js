// src/utils/redisClient.js
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export const connectRedis = async () => {
  if (isConnected) return;
  await redisClient.connect();
  isConnected = true;
  console.log('✅ Connected to Redis');
};

export default redisClient;


