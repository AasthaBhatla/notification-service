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
    },
    {
        "_id": "68290568e6222541491896f7",
        "userId": "user123",
        "type": "email",
        "message": "Hello from notification service!",
        "status": "pending",
        "createdAt": "2025-05-17T21:53:44.759Z",
        "__v": 0
    },
    {
        "_id": "6829dd45e1210c10fb5ffae8",
        "userId": "user123",
        "type": "email",
        "message": "Hello from notification service!",
        "status": "pending",
        "createdAt": "2025-05-18T13:14:45.440Z",
        "__v": 0
    },
    {
        "_id": "6829e9e9f8f92e4654716616",
        "userId": "user123",
        "type": "email",
        "message": "Hello from notification service!",
        "status": "pending",
        "createdAt": "2025-05-18T14:08:41.961Z",
        "__v": 0
    }


