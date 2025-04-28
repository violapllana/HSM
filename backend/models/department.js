const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const User = require('./user'); 

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  }
});

Department.belongsToMany(User, {
  through: 'DoctorDepartment', 
  foreignKey: 'departmentId',
  otherKey: 'doctorId',
  as: 'departmentDoctors',
});

module.exports = Department;
