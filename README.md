# Chatlly

Chatlly is a full-stack real-time chat application with private and group conversations, built with React, Express, MongoDB and Socket.IO.

## Live Demo

- Live: https://chatlly.onrender.com

## GitHub

- Repository: https://github.com/Sumitkr113/Chatly

## Features

- **Authentication** – Sign up, log in and log out with email and password; passwords are hashed using bcrypt.
- **HTTP-only JWT cookies** – Authentication tokens are stored in HTTP-only cookies with a 7-day expiry.
- **Real-time private messaging** – Send and receive text and image messages instantly using Socket.IO.
- **Online presence** – Track online and offline users and filter contacts to show currently online users.
- **Group chat** – Create groups, add and remove members, delete groups, and exchange messages in real time.
- **Server-side group authorization** – Only group admins can perform protected group management actions, while group message access is restricted to members.
- **JWT-based Socket.IO authentication** – Socket connections are authenticated using the JWT cookie instead of trusting a client-supplied user ID.
- **Multi-tab / multi-device socket handling** – Multiple simultaneous socket connections are tracked per user so one disconnected tab does not incorrectly mark the user offline.
- **Image handling** – Profile pictures and private-message images are uploaded to Cloudinary.
- **Responsive chat UI** – Includes loading states, optimistic message rendering and responsive sidebar behavior.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, Zustand, Axios, Tailwind CSS 4, DaisyUI, lucide-react, react-icons, react-toastify |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Real-time | Socket.IO |
| Authentication | JSON Web Tokens (jsonwebtoken), bcryptjs, cookie-parser |
| Media | Cloudinary |

## Architecture / How It Works

```text
React (Vite) Frontend
        │
        ├── REST (Axios + HTTP-only cookies)
        │
        └── WebSocket (Socket.IO + JWT cookie)
                    │
                    ▼
             Node.js / Express
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   MongoDB / Mongoose      Cloudinary
```

1. The user signs up or logs in through the REST API.
2. The backend generates a JWT and stores it in an HTTP-only `jwt` cookie.
3. The frontend establishes a Socket.IO connection with credentials enabled.
4. The Socket.IO server verifies the JWT from the cookie and attaches the authenticated user ID to the socket.
5. Each authenticated socket joins a private per-user room for real-time message delivery.
6. Group operations and group message access are protected using server-side membership and admin authorization.

API route groups:

```text
/api/auth
/api/message
/api/group
```

## Project Structure

```text
backend/
└── src/
    ├── controllers/    auth, message and group logic
    ├── lib/            database, socket, Cloudinary, cookie and token helpers
    ├── middlewares/    JWT authentication middleware
    ├── models/         user, message and group models
    ├── routes/         auth, message and group routes
    └── index.js         server entry point

frontend/
└── src/
    ├── components/     chat UI, sidebar, group components and skeletons
    ├── pages/          Home, Login, SignUp, Profile and Settings
    ├── store/          Zustand state management
    ├── lib/            Axios instance and helpers
    ├── App.jsx
    └── main.jsx
```

## Local Setup

Prerequisites:

- Node.js
- MongoDB database (MongoDB Atlas or local MongoDB)
- Cloudinary account

### 1. Clone the repository

```powershell
git clone https://github.com/Sumitkr113/Chatly.git
cd Chatly
```

### 2. Install backend dependencies

```powershell
cd backend
npm install
```

### 3. Install frontend dependencies

Open a second terminal:

```powershell
cd frontend
npm install
```

### 4. Configure environment variables

Create:

```text
backend/.env
```

using:

```text
backend/.env.example
```

For local development, use:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGO_DB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The frontend development configuration uses:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Never commit real `.env` files or credentials.

### 5. Start the backend

From the `backend` directory:

```powershell
npm run dev
```

### 6. Start the frontend

From the `frontend` directory:

```powershell
npm run dev
```

Open the URL shown by Vite, typically:

```text
http://localhost:5173
```

## Environment Variables

### Backend

| Variable | Purpose |
| --- | --- |
| `PORT` | Port on which the backend server runs |
| `NODE_ENV` | Application environment |
| `CLIENT_URL` | Frontend origin allowed by CORS and Socket.IO |
| `MONGO_DB` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL for REST API requests |
| `VITE_SOCKET_URL` | Base URL for Socket.IO |

## Available Scripts

### Backend

| Script | Description |
| --- | --- |
| `npm run dev` | Start the backend with nodemon |
| `npm start` | Start the backend with Node.js |

### Frontend

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Security / Engineering

- JWT authentication uses **HTTP-only cookies**.
- Cookie behavior is environment-aware for development and production.
- Socket.IO connections are authenticated using the JWT cookie.
- Client-supplied socket `userId` values are not trusted for authentication.
- Multiple socket connections per user are supported.
- Group admin and membership authorization is enforced on the server.
- Group message access is restricted to group members.
- Passwords are hashed using bcrypt.
- Password hashes are excluded from relevant user queries.
- API, Socket.IO and CORS configuration is environment-based.

## Deployment

Chatlly uses a separate frontend and backend architecture.

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + Socket.IO
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary
- **Deployment:** Render

Environment variables for deployed services are configured through the hosting platform and are not committed to the repository.

## Screenshots

Screenshots can be added here to showcase:

- Login / Signup
- Main chat interface
- Group chat interface

## Future Improvements

- Rate limiting for authentication endpoints
- Schema-based input validation
- Cursor-based message pagination
- Cloudinary upload support for group message images
- Stronger validation for Socket.IO group room access
- Improved frontend settings and UI polish
- Automated backend and Socket.IO testing
- GitHub Actions CI/CD

## License

No license is currently specified for this project.