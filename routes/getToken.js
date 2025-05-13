const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Load users from JSON file
const usersFilePath = path.join(__dirname, '../users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

// POST /getToken
router.post('/', (req, res) => {
    const { username, password } = req.body;
  
    // Validate username and password
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ errorMessage: 'Invalid username or password' });
    }
  
    // Generate JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ successMessage: 'Authentication successful', token });
  });
  
  module.exports = router;

