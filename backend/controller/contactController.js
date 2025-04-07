const ContactForm = require('../models/contactform'); // Import the ContactForm model

// Create a contact message
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, reason, messageContent } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !reason || !messageContent) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të nevojshme!' });
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Email nuk është në formatin e duhur!' });
    }

    const newContact = await ContactForm.create({ firstName, lastName, email, phoneNumber, reason, messageContent });
    
    res.status(201).json({ message: 'Mesazhi u krijua me sukses!', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Gabim në krijimin e mesazhit', error: err.message });
  }
};

// Get all contact messages
const getContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.findAll();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e mesazheve', error: err.message });
  }
};

// Delete a contact message
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactForm.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Mesazhi nuk u gjet' });
    }

    await contact.destroy();
    res.status(200).json({ message: 'Mesazhi u fshi me sukses', contact });
  } catch (err) {
    res.status(400).json({ message: 'Gabim në fshirjen e mesazhit', error: err.message });
  }
};

module.exports = { createContact, getContacts, deleteContact };
