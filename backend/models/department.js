const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Database connection

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  headOfDepartment: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,  
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
});

module.exports = Department;
