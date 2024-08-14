# Movie Review App

## Overview

This is a full-stack movie review application built using Angular for the frontend and NestJS for the backend. It allows users to register, log in, view a list of movies, see movie details with reviews, add their own reviews, and manage their profile.

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**

### Cloning the Repository

1. Clone the repository:
   ```bash
   git clone git@github.com:ahsaanshuja/movie-review-app.git
   cd movie-review-app
   ```

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd movie-review-backend
   ```

2. Create a `.env` file in the `movie-review-backend` directory with the following content:

   ```env
   MONGO_URL=mongodb://mongo:27017/moviedb
   JWT_SECRET=your_jwt_secret
   ```

3. Build and run the backend services:

   ```bash
   docker-compose up --build
   ```

   The backend server will start on `http://localhost:3000`, and a MongoDB instance will run on `mongodb://localhost:27017`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd movie-review-frontend
   ```

2. Create an `environment.ts` file in the `src/environments` directory with the following content:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:3000",
   };
   ```

3. Build and run the frontend:

   ```bash
   docker-compose up --build
   ```

   The frontend will be accessible at `http://localhost:4200`.

## Development

- **Backend**:

  - To start the backend server locally:
    ```bash
    npm run start:dev
    ```
  - Access the backend at `http://localhost:3000`.

- **Frontend**:
  - To start the frontend server locally:
    ```bash
    npm start
    ```
  - Access the frontend at `http://localhost:4200`.

## Deployment

The application is containerized with Docker and can be deployed using Docker Compose.
