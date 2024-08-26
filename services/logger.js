const fs = require('fs');
const winston = require('winston');
const config = require('../config/config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: config.logFilePath }),
    ],
});

const setupLogging = (app) => {
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url} - ${res.statusCode}`);
        next();
    });
};

const logTaskCompletion = (userId) => {
    const message = `${userId}-task completed at-${Date.now()}`;
    logger.info(message);
};

module.exports = { setupLogging, logTaskCompletion };