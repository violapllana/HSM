const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const DoctorDepartment = sequelize.define('DoctorDepartment', {
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

module.exports = DoctorDepartment;
