const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const DoctorPatient = sequelize.define('DoctorPatient', {
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['doctorId', 'patientId']
    }
  ]
});

module.exports = DoctorPatient;
