const ContactForm = require('../models/contactform');

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, reason, messageContent } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !reason || !messageContent) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Invalid email format!' });
    }

    const newContact = await ContactForm.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      reason,
      messageContent,
    });

    res.status(201).json({ message: 'Message created successfully!', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Error creating message', error: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const contacts = await ContactForm.findAll({
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving messages', error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactForm.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await contact.destroy();
    res.status(200).json({ message: 'Message deleted successfully', contact });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting message', error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactForm.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving message', error: err.message });
  }
};

module.exports = { createContact, getContacts, deleteContact, getContactById };
