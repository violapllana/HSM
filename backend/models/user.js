
// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       len: { args: [3, 20], msg: "Username must be between 3 and 20 characters." }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: { msg: "Must be a valid email address." }
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, 100],
//         msg: "Password must be at least 8 characters long."
//       },
//       is: {
//         args: /^(?=(?:.*[a-z]){5,})(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
//         msg: "Password must contain at least 5 lowercase letters, one uppercase letter, one number, and one special character."
//       }
//     }
//   },
//   role: {
//     type: DataTypes.ENUM('patient', 'doctor', 'admin'),
//     defaultValue: 'patient',
//     allowNull: false,
//   }
// });

// module.exports = User;
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
      len: {
        args: [8, 100],
        msg: "Password must be at least 8 characters long."
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
