const Notification = require('../models/Notification');
const notificationQueue = require('../queues/notificationQueue'); // ✅ Import the queue

exports.sendNotification = async (req, res) => {
    const { userId, type, message } = req.body;

    try {
        // Step 1: Create and save notification
        const notification = new Notification({ userId, type, message });
        await notification.save();

        // Step 2: Add job to queue instead of sending immediately
        await notificationQueue.add('send', {
            notificationId: notification._id,
            userId,
            type,
            message
        });

        // Step 3: Respond to client
        res.status(202).json({ message: 'Notification enqueued for delivery' });
    } catch (err) {
        console.error('Error queuing notification:', err);
        res.status(500).json({ error: 'Failed to queue notification' });
    }
};

exports.getUserNotifications = async (req, res) => {
    const { id } = req.params;
    try {
        const notifications = await Notification.find({ userId: id });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};
