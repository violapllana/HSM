const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
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
      len: { args: [8, 100], msg: "Password must be at least 8 characters long." },
      is: {
        args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
});

module.exports = User;
