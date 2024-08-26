const Queue = require('bull');
const Redis = require('ioredis');
const config = require('../config/config');
const { logTaskCompletion } = require('../services/logger');

const redisClient = new Redis({
    host: config.redisHost,
    port: config.redisPort,
});

const taskQueue = new Queue('tasks', {
    redis: { host: config.redisHost, port: config.redisPort },
});

taskQueue.process(async (job, done) => {
    const { userId } = job.data;
    logTaskCompletion(userId);
    done();
});

const queueTask = (userId, callback) => {
    taskQueue.add({ userId }, { delay: 1000 }); // 1 task per second
    callback();
};

module.exports = { queueTask };