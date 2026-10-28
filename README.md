## Full-Stack-Hotel-App

A full-stack hotel management and booking application that allows guests to explore hotels, view room options, make bookings, and manage their profiles. Administrators can manage hotel listings, rooms, and other hotel-related information.

## Features

### Guest Features
- Browse available hotels and view hotel details.
- View hotel images, descriptions, locations, facilities, and star ratings.
- Explore available room types, prices, capacity, and facilities.
- Register and log in to an account.
- Manage personal profile information.
- View and manage hotel bookings.
- Submit and manage hotel reviews.
- Add hotels to favourites.

### Administrator Features
- Access the admin dashboard.
- Add, update, and delete hotel listings.
- Manage hotel rooms.
- View registered users.
- Add administrator accounts.
- Manage hotel information and images.

## Technologies Used

### Frontend
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Neon Database
- JSON Web Tokens (JWT)
- bcrypt

### Image Storage
- Cloudinary

## Project Structure

```text
Full-Stack-Hotel-App/
├── frontend/
│   ├── src/
│   └── package.json
├── backend/
│   ├── src/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm
- Git
- A PostgreSQL database
- A Cloudinary account for image storage

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd Full-Stack-Hotel-App
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

### Environment Variables

Configure the required environment variables in the frontend and backend environment files.

These may include:
- Database connection string
- JWT secret
- Cloudinary credentials
- Frontend API base URL

Refer to the frontend and backend README files for the exact variables and setup instructions. Never commit real credentials or secrets.

## Running the Application

Start the backend and frontend in separate terminals using the development scripts defined in their respective `package.json` files.

## Deployment

The backend is deployed on Render:

https://full-stack-hotel-app.onrender.com

The frontend deployment URL can be added here once confirmed.

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## Future Improvements

- Complete and refine the booking and payment workflows.
- Improve validation and error handling.
- Add further testing and accessibility improvements.

## Author

Developed as a full-stack software development project.
