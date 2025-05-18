const Notification = require('../models/Notification');
const notificationQueue = require('../queues/notificationQueue');

exports.sendNotification = async (req, res) => {
    const { userId, type, message } = req.body;

    try {
        const notification = new Notification({ userId, type, message });
        await notification.save();

        // Add job with retry options
        await notificationQueue.add('send', {
            notificationId: notification._id,
            userId,
            type,
            message
        }, {
            attempts: 5, // Retry up to 5 times on failure
            backoff: {
                type: 'exponential', // Exponential backoff
                delay: 1000 // Initial delay of 1 second
            }
        });

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
