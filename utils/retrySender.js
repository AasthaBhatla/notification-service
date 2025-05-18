const { sendEmail, sendSMS, sendInApp } = require('./senders');

async function retrySend(type, userId, message) {
    if (type === 'email') {
        await sendEmail(userId, message);
    } else if (type === 'sms') {
        await sendSMS(userId, message);
    } else if (type === 'inApp') {
        await sendInApp(userId, message);
    } else {
        throw new Error(`Unsupported notification type: ${type}`);
    }

    return 'sent';
}

module.exports = retrySend;
