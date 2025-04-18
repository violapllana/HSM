

// // module.exports = Appointment;
// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const User = require('./user');
// const Department = require('./department');

// const Appointment = sequelize.define('Appointment', {
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   reason: {
//     type: DataTypes.STRING,
//   },
// });

// // Lidhjet
// Appointment.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
// Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
// Appointment.belongsTo(Department, { foreignKey: 'departmentId' });

// module.exports = Appointment;
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Department = require('./department');

const Appointment = sequelize.define('Appointment', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Të jetë i detyrueshëm
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Të jetë i detyrueshëm
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Të jetë i detyrueshëm
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false, // Të jetë i detyrueshëm
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,  // Mund të jetë opsionale
  },
});

// Lidhjet
Appointment.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Appointment.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = Appointment;
