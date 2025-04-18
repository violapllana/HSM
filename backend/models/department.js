// const { DataTypes } = require('sequelize');
// const sequelize = require('../db'); 


//     const Department = sequelize.define("Department", {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//       }
//     });
  
//     module.exports = Department;
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const User = require('./user'); // Sigurohuni që rruga është e saktë në varësi të strukturës së dosjeve

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  }
});

// Lidhja shumë-në-shumë me doktorët
Department.belongsToMany(User, {
  through: 'DoctorDepartment', // Kjo është tabela ndërmjetëse
  foreignKey: 'departmentId',
  otherKey: 'doctorId',
  as: 'departmentDoctors',
});

module.exports = Department;
