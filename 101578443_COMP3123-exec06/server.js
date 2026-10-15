
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/NoteRoutes');

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8081;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});

// Register note routes
app.use('/', noteRoutes);

// Connect to MongoDB Atlas
mongoose.connect(DB_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to the database:', err);
        process.exit(1);
    });
