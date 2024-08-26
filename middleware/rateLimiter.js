const Redis = require('ioredis');
const config = require('../config/config');
const redisClient = new Redis({
    host: config.redisHost,
    port: config.redisPort,
});

const rateLimitMiddleware = async (req, res, next) => {
    const userId = req.body.user_id;
    const currentTime = Date.now();
    const userKey = `rate_limit:${userId}`;

    try {
        const requests = await redisClient.lrange(userKey, 0, -1);
        const validRequests = requests.filter(timestamp => currentTime - timestamp < 60000); // 1 minute

        if (validRequests.length >= 20) {
            return res.status(429).json({ error: 'Too many requests, please try again later.' });
        }

        if (validRequests.filter(timestamp => currentTime - timestamp < 1000).length >= 1) {
            return res.status(429).json({ error: 'Too many requests, please try again later.' });
        }

        await redisClient.multi()
            .lpush(userKey, currentTime)
            .ltrim(userKey, 0, 19)
            .expire(userKey, 60)
            .exec();

        next();
    } catch (err) {
        console.error('Redis error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const setupRateLimit = (app) => {
    app.use('/tasks', rateLimitMiddleware);
};

module.exports = { setupRateLimit };