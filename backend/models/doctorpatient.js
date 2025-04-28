const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
