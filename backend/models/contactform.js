const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

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
});

module.exports = ContactForm;
