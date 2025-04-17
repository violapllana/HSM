const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./models/user'); 

const DoctorPatient = sequelize.define('DoctorPatient', {
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsToMany(User, {
  through: DoctorPatient,
  foreignKey: 'doctorId',
  as: 'patients',
});
User.belongsToMany(User, {
  through: DoctorPatient,
  foreignKey: 'patientId',
  as: 'doctors',
});

module.exports = DoctorPatient;
