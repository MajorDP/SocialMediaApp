# Social Media / Chat App

A **MERN stack** application for social media with a **mood-based algorithm** and **real-time chat** functionality.

## Current Features

- **Mood-Based Algorithm**: Users can cater their search algorithm based on their current mood.
- **Real-Time Messaging**: Users can send and receive messages in real-time.
- **Temporary chats**: Users can send and receive messages in real-time with people matching their current mood, even if they are not friends.
- **User Authentication**: JWT-based authentication to secure user access.
- **Protected Routes**: Routes that require authentication to access.
- **Post Management**: Users can create, edit, and delete their posts.
- **Friendship System**: Users can add and remove each other as friends.
- **Profile Management**: Users can update their account details.
- **Landing Page**: A welcoming page for new visitors.
- **Language Responsiveness**: The application's language is interchangable between English and Bulgarian.

## Setup

1. Clone the repository.
2. Install dependencies for the backend and frontend:
   - `npm install` in the backend folder
   - `npm install` in the frontend folder
3. Set up your `.env` file for the backend (MONGO_URI, ACCESS_TOKEN_SECRET, SERVER_PORT and SOCKET_PORT).
4. Run the backend server:
   - `npm start` in the backend folder
5. Run the Socket.io server for realtime chat feature:
   - `npm run chat` in the backend folder
6. Run the frontend:
   - `npm run dev` in the frontend folder
