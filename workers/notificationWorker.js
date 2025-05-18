const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const Notification = require('../models/Notification');
const retrySend = require('../utils/retrySender');

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  'notificationQueue',
  async job => {
    const { notificationId, userId, type, message } = job.data;
    const status = await retrySend(type, userId, message);
    await Notification.findByIdAndUpdate(notificationId, { status });
  },
  { connection }
);

console.log('Notification worker is running...');
