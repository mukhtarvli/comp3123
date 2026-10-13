const express = require('express');
const app = express();
const userRouter = require('./routes/users');

app.use(express.json());

// Add User Router
app.use('/api/v1/user', userRouter);

// 404 handler for routes that do not exist
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log('Web Server is listening at port ' + port);
});