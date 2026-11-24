const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
});

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Demo User
const user = {
  id: 1,
  username: "admin",
  password: "password123",
};

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Redux JWT Authentication API is running",
  });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Validate Credentials
  if (username !== user.username || password !== user.password) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h", algorithm: "HS256" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  });
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const [scheme, token] = (authHeader || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Access token required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    console.log("Decoded JWT:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// Protected Dashboard Route
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to your dashboard",
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});