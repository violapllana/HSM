const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the sequelize instance

const ContactForm = sequelize.define('ContactForm', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messageContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  statusi: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
});

module.exports = ContactForm;
