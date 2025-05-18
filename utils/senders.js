// utils/senders.js

exports.sendEmail = async (userId, message) => {
    // Simulate email sending
    console.log(`[Email] Sent to User ${userId}: "${message}"`);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
};

exports.sendSMS = async (userId, message) => {
    // Simulate SMS sending
    console.log(`[SMS] Sent to User ${userId}: "${message}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
};

exports.sendInApp = async (userId, message) => {
    // Simulate in-app notification (e.g., push to UI or socket)
    console.log(`[In-App] Notification for User ${userId}: "${message}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
};
