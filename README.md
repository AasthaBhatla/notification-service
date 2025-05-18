# Notification Service

A backend system for sending Email, SMS, and In-App notifications using Node.js, MongoDB, Redis, and BullMQ.

---

## Features

- Asynchronous notification delivery via queue (BullMQ + Redis)
- Supports Email, SMS, and In-App notifications
- Retry logic for failed deliveries
- REST API to send and fetch notifications

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- BullMQ + Redis
- .env for config management

---

## API Endpoints

### Send a Notification

POST /notifications

Request Body:
json
{
  "userId": "user123",
  "type": "email", 
  "message": "Hello from notification service!"
}

Email:Sent to User user123: "Hello from notification service!"    

### Get User Notifications

GET /notifications/users/user123/notifications

Responses

{
        "_id": "682904f3aeee519948b8236b",
        "userId": "user123",
        "type": "email",
        "message": "Hello from notification service!",
        "status": "pending",
        "createdAt": "2025-05-17T21:51:47.653Z",
        "__v": 0
    }

