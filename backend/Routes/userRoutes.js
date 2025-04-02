
const express = require('express');
const { register, login, getUserProfile } = require('../controller/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', isAuthenticated, getUserProfile);

// Admin-only route
router.get('/admin', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Doctor-only route
router.get('/doctor', isAuthenticated, authorizeRoles('doctor'), (req, res) => {
  res.json({ message: 'Welcome, Doctor!' });
});

// Patient-only route
router.get('/patient', isAuthenticated, authorizeRoles('patient'), (req, res) => {
  res.json({ message: 'Welcome, Patient!' });
});

module.exports = router;
