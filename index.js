const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const notificationRoutes = require('./routes/notifications');
app.use('/notifications', notificationRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
