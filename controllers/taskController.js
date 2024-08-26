const { queueTask } = require('../queues/taskQueue');

exports.processTask = (req, res) => {
    const userId = req.body.user_id;

    queueTask(userId, () => {
        res.status(200).json({ message: 'Task queued successfully' });
    });
};