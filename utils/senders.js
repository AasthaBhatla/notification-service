exports.sendEmail = async (userId, message) => {
    console.log(`[Email] Sent to User ${userId}: "${message}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
};

exports.sendSMS = async (userId, message) => {
    console.log(`[SMS] Sent to User ${userId}: "${message}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
};

exports.sendInApp = async (userId, message) => {
    console.log(`[In-App] Notification for User ${userId}: "${message}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
};
