# Hotel App — Backend

## Overview

The backend provides the API and server-side functionality for the Full-Stack Hotel App. It handles authentication, user management, hotel listings, room management, bookings, payments, reviews, and communication with the database.

## Technologies Used

- **Node.js** — JavaScript runtime.
- **Express.js** — building the REST API.
- **TypeScript** — providing static typing.
- **PostgreSQL** — relational database.
- **Neon** — hosted PostgreSQL database.
- **JSON Web Tokens (JWT)** — authentication.
- **bcrypt** — password hashing.
- **Cloudinary** — storing and managing hotel images.

## Features

- User registration and login.
- Token-based authentication.
- Role-based access for guests and administrators.
- Hotel creation, retrieval, updating, and deletion.
- Room management.
- User profile management.
- Booking management.
- Payment processing.
- Hotel reviews.
- Hotel image management through Cloudinary.
- PostgreSQL database queries.

## Project Structure

```text
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── server.ts
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Make sure Node.js and npm are installed.

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory and configure the variables required by the application.

Typical variables may include:

```env
PORT=3000
DATABASE_URL=your_neon_database_connection_string
JWT_SECRET=your_jwt_secret
```

Add your Cloudinary credentials and any payment provider keys required by your implementation.

Use the exact variable names referenced in your backend code. Keep `.env` out of version control.

## Running the Server

Start the backend using the development script configured in `package.json`. For example, if your project uses `dev`:

```bash
npm run dev
```

The server will start on the configured port.

## API Base URL

The deployed backend is available at:

https://full-stack-hotel-app.onrender.com

API routes are grouped by resource. For example, user-related routes use `/api/users`, while hotel-related routes use `/api/hotels`.

## Authentication and Authorization

The API uses JSON Web Tokens to authenticate protected requests. Passwords are hashed with bcrypt before being stored in the database.

Role-based middleware restricts administrator operations to authorized users. Public registration creates regular user accounts, while creating administrator accounts requires administrator authorization.

Protected endpoints require a valid token in the request's `Authorization` header:

```http
Authorization: Bearer <your_token>
```

## Database

The application uses PostgreSQL hosted on Neon. Database queries are executed by the backend to retrieve and manage application data.

## Image Storage

Cloudinary is used to store and manage hotel images. Image-related functionality is handled by the backend and connected to the frontend through the API.

## Production Deployment

The backend is deployed on Render:

https://full-stack-hotel-app.onrender.com

## Author

Developed as part of the Full-Stack Hotel App project.
