const express = require('express');
const { processTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', processTask);  // Handle POST requests at /task

module.exports = router;