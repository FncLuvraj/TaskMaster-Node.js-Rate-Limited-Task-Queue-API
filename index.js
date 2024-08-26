const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { setupRateLimit } = require('./middleware/rateLimiter');
const taskRouter = require('./routes/taskRoutes');
const { setupLogging } = require('./services/logger');

if (cluster.isMaster) {
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died, starting a new worker`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());

    setupRateLimit(app);
    setupLogging(app);

    app.use('/tasks', taskRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} running on port ${PORT}`);
    });
}