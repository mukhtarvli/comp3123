# COMP3123 – Lab Exercise 10

## Redux and JWT Authentication

**Student Name:** Mukhtar Abdullahi Ali
**Student ID:** 101578443

## Project Overview

This application demonstrates React Redux and JSON Web Token (JWT) authentication. Users can log in, access a protected dashboard, view their Redux authentication state, and log out.

The frontend uses React and Redux Toolkit, while the backend uses Node.js and Express to generate and verify JWT tokens.

## Technologies Used

- React
- Vite
- Redux Toolkit
- React Redux
- Node.js
- Express.js
- JSON Web Token (JWT)
- CSS
- Postman

## Redux Concepts

### 0. State
State represents the application's current data. In this application, the authentication state contains the user, JWT token, and authentication status.

### 1. Store
The store is the central location where Redux manages application state. It is created using `configureStore()`.

### 2. Reducer
Reducers determine how the state changes when an action is dispatched. This application uses login and logout reducers.

### 3. Action
An action describes an event that occurs in the application. The login and logout action creators are generated using Redux Toolkit's `createSlice()`.

### 4. Dispatch
Dispatch sends actions to the Redux store. The application uses the `useDispatch()` hook to dispatch login and logout actions.

### 5. Subscribe
Subscribe allows the application to listen for Redux state changes. The application uses `store.subscribe()` to log authentication status changes and `useSelector()` to read state and update the user interface.

## JWT Authentication

JSON Web Token is a standard used to securely transmit claims between parties through signed tokens.

A signed JWT contains three parts:

- Header: Contains the token type and signing algorithm.
- Payload: Contains user information and expiration time.
- Signature: Verifies the integrity and authenticity of the token.

### Authentication Process

1. The user enters their username and password.
2. The backend validates the credentials.
3. The backend generates a signed JWT.
4. The frontend stores the token in Redux.
5. The frontend sends the token through the Authorization header.
6. The backend verifies the token before granting access to the protected dashboard.
7. Logging out clears the authentication state.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | API status |
| POST | /api/login | Authenticate user and generate JWT |
| GET | /api/dashboard | Access protected dashboard |

## Installation and Setup

### Frontend

```bash
npm install
npm run dev
```

Frontend URL: http://localhost:5173

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
JWT_SECRET=your_local_secret_key
```

Start the backend:

```bash
node server.js
```

Backend URL: http://localhost:5000

## Demo Credentials

- Username: admin
- Password: password123

## Application Features

- User login and logout
- JWT generation and verification
- Protected API endpoint
- Centralized Redux state management
- Authentication state visualization
- Error handling for invalid credentials and tokens

## Security and Limitations

This application is intended for educational purposes. It uses hardcoded demo credentials and stores JWT tokens in memory. Authentication resets when the browser is refreshed. Logging out clears the client state but does not revoke previously issued tokens.

The JWT secret is stored in an environment variable and excluded from GitHub.

## Research References

- Redux: https://redux.js.org/
- Redux Toolkit: https://redux-toolkit.js.org/
- React Redux: https://react-redux.js.org/
- JWT: https://jwt.io/
- Express: https://expressjs.com/

## Conclusion

This lab demonstrates how Redux manages centralized application state and how JWT authentication protects backend resources. Combining these technologies allows React applications to manage authentication and communicate with protected API endpoints.