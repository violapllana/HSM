const express = require('express');
const { register, login, getUserProfile } = require('../controller/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', isAuthenticated, getUserProfile);

// Admin-only route example
router.get('/admin', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;