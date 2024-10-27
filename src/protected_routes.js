const express = require('express');
const authMiddleware = require('./auth_routes_middleware');
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

module.exports = router;
