
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: { args: [3, 20], msg: "Username must be between 3 and 20 characters." }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Must be a valid email address." }
    }
  },
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: [/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/],
        msg: "Password must start with an uppercase letter, contain at least 8 characters, a number, and a special character."
      }
    }
  },
  role: {
    type: DataTypes.ENUM('patient', 'doctor', 'admin'),
    defaultValue: 'patient',
    allowNull: false,
  }
});

module.exports = User;
