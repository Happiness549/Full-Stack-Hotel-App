# Hotel App — Frontend

## Overview

The frontend is the user interface for the Full-Stack Hotel App. It allows guests to browse hotels, view hotel and room details, manage their accounts, make bookings, and interact with hotel reviews. It also provides an administration dashboard for managing hotel information and rooms.

## Technologies Used

- **React** — building the user interface.
- **TypeScript** — providing static typing.
- **Redux Toolkit** — managing application state.
- **Tailwind CSS** — styling and responsive layouts.
- **Fetch API** — communicating with the backend API.

## Features

### Guest Features
- Register and log in.
- Browse hotel listings.
- View hotel details, images, locations, facilities, and ratings.
- Explore room types, prices, capacity, and availability information.
- Make and manage bookings.
- Manage profile information.
- Add hotels to favourites.
- View and manage reviews.

### Administrator Features
- Access the admin dashboard.
- Add, update, and delete hotels.
- Manage hotel rooms.
- View registered users.
- Create administrator accounts.
- Manage hotel images and listing information.

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ui/
│   ├── pages/
│   ├── redux/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Make sure Node.js and npm are installed.

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Configure the frontend environment variables required by the application, including the backend API URL if your code uses one.

For a Vite application, environment variables exposed to the frontend must use the `VITE_` prefix.

Example:

```env
VITE_API_URL=https://full-stack-hotel-app.onrender.com
```

Use the variable name expected by your actual code. Do not commit secrets or credentials to the repository.

## Running the Application

Start the development server:

```bash
npm run dev
```

Use the local URL displayed in the terminal to open the application.

## Backend Connection

The frontend communicates with the backend API for authentication, hotel listings, room information, bookings, reviews, and other application functionality.

**Deployed backend:** https://full-stack-hotel-app.onrender.com

## Production Build

Build the frontend for production:

```bash
npm run build
```

## Author

Developed as part of the Full-Stack Hotel App project.

