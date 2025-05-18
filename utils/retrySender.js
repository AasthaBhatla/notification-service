// utils/retrySender.js
const { sendEmail, sendSMS, sendInApp } = require('./senders');

async function retrySend(type, userId, message, maxRetries = 3) {
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            if (type === 'email') await sendEmail(userId, message);
            else if (type === 'sms') await sendSMS(userId, message);
            else await sendInApp(userId, message);
            return 'sent';
        } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} failed for ${type} to user ${userId}`);
        }
    }
    return 'failed';
}

module.exports = retrySend;
