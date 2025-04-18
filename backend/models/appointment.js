

// module.exports = Appointment;
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Department = require('./department');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
  },
});

// Lidhjet
Appointment.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Appointment.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = Appointment;
