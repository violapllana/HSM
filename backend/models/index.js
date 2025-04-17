const User = require('./user');
const Report = require('./report');

// Krijimi i lidhjeve
Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });

User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });

module.exports = {
  User,
  Report,
};
