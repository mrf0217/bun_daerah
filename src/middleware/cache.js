// src/middleware/cache.js
import { connectRedis, redisClient } from '../utils/redisClient.js';

const defaultTtlSeconds = Number(process.env.CACHE_TTL_SECONDS || 300);

export const cacheMiddleware = (keyBuilder, ttlSeconds = defaultTtlSeconds) => {
  return async (req, res, next) => {
    try {
      await connectRedis();
      const key = typeof keyBuilder === 'function' ? keyBuilder(req) : keyBuilder;
      if (!key) return next();

      const cached = await redisClient.get(key);
      if (cached) {
        const payload = JSON.parse(cached);
        try { res.set('X-Cache', 'HIT'); res.set('X-Cache-Key', key); } catch (_) {}
        return res.json(payload);
      }

      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        try {
          await redisClient.setEx(key, ttlSeconds, JSON.stringify(body));
        } catch (e) {
          // ignore cache set errors
        }
        try { res.set('X-Cache', 'MISS'); res.set('X-Cache-Key', key); } catch (_) {}
        return originalJson(body);
      };

      next();
    } catch (err) {
      next();
    }
  };
};

export default cacheMiddleware;


