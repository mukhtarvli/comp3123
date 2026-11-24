import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Read Redux State
  const { user, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redux Dispatch
  const dispatch = useDispatch();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Dispatch Login Action
      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      );

      setPassword("");
    } catch (error) {
      setError("Unable to connect to the server");
    }
  };

  // Access Protected Dashboard
  const fetchDashboard = async () => {
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setMessage("");

        if (response.status === 401) {
          dispatch(logout());
        }

        return;
      }

      setMessage(data.message);
    } catch (error) {
      setError("Failed to access dashboard");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    setMessage("");
    setError("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <h1>Redux JWT Authentication</h1>
      <p>COMP3123 - Lab Exercise 10</p>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="dashboard">
          <h2>Welcome, {user.username}!</h2>
          <p>User ID: {user.id}</p>
          <p>Authentication: JWT</p>
          <p>Status: Authenticated</p>

          <button onClick={fetchDashboard}>
            Access Protected Dashboard
          </button>

          {message && <p className="success">{message}</p>}

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="redux-state">
        <h3>Current Redux State</h3>
        <pre>
          {JSON.stringify(
            {
              user,
              isAuthenticated,
              token: token ? "JWT received" : null,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

export default App;