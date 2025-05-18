const { Queue } = require('bullmq');
const { Redis } = require('ioredis');

const connection = new Redis();

const notificationQueue = new Queue('notificationQueue', { connection });

module.exports = notificationQueue;
