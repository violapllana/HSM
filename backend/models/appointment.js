const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Department = require('./department');

const Appointment = sequelize.define('Appointment', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relacionet
Appointment.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' }); // kjo është për emrin e doktorit
Appointment.belongsTo(Department, { as: 'department', foreignKey: 'departmentId' }); // kjo për emrin e departamentit

module.exports = Appointment;
