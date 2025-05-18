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

    try {
      const status = await retrySend(type, userId, message);
      await Notification.findByIdAndUpdate(notificationId, { status });
      console.log(`Notification ${notificationId} processed successfully.`);
    } catch (err) {
      console.error(`Error processing notification ${notificationId}:`, err);
      throw err; // IMPORTANT: triggers retry
    }
  },
  { connection }
);

worker.on('failed', (job, err) => {
  console.error(` Job ${job.id} failed after ${job.attemptsMade} attempts:`, err.message);
});

console.log(' Notification worker is running...');
