const Notification = require('../models/Notification');
const notificationQueue = require('../queues/notificationQueue');

exports.sendNotification = async (req, res) => {
    const { userId, type, message } = req.body;

    try {
        const notification = new Notification({ userId, type, message });
        await notification.save();
        
        await notificationQueue.add('send', {
            notificationId: notification._id,
            userId,
            type,
            message
        }, {
            attempts: 5, 
            backoff: {
                type: 'exponential', 
                delay: 1000 
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
