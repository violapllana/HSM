const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 


    const Department = sequelize.define("Department", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      }
    });
  
    module.exports = Department;