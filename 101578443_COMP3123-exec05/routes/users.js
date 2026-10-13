const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();
const userFilePath = path.join(__dirname, '..', 'user.json');

function readUserData() {
  return JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
}

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req, res, next) => {
  try {
    res.json(readUserData());
  } catch (err) {
    next(err);
  }
});

/*
- Accept username and password as JSON body parameters
- Check them against user.json and return the appropriate response
*/
routerUser.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = readUserData();

    // Support either one user object or an array of users
    const users = Array.isArray(userData) ? userData : [userData];
    const user = users.find((item) => item.username === username);

    if (!user) {
      return res.json({
        status: false,
        message: 'User Name is invalid',
      });
    }

    if (user.password !== password) {
      return res.json({
        status: false,
        message: 'Password is invalid',
      });
    }

    res.json({
      status: true,
      message: 'User Is valid',
    });
  } catch (err) {
    next(err);
  }
});

/*
- Accept username as a route parameter and return the logout message in HTML
*/
routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.</b>`);
});

module.exports = routerUser;