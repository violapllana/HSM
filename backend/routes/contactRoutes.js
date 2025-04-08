const express = require('express');
const router = express.Router();
const { createContact, getContacts, deleteContact, getContactById } = require('../controller/contactController');

// CRUD routes for contact messages
router.post('/', createContact); // Create message
router.get('/', getContacts); // Get all messages
router.get('/:id', getContactById); // Get message by ID
router.delete('/:id', deleteContact); // Delete message by ID

module.exports = router;
