const User = require('./user');
const Report = require('./report');
const DoctorPatient = require('./doctorpatient');

// Krijimi i lidhjeve
Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });

User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });



// Lidhja shumë-në-shumë midis mjekut dhe pacientit
User.belongsToMany(User, {
  through: DoctorPatient,
  foreignKey: 'doctorId',
  otherKey: 'patientId',
  as: 'patients',
});
User.belongsToMany(User, {
  through: DoctorPatient,
  foreignKey: 'patientId',
  otherKey: 'doctorId',
  as: 'doctors',
});


module.exports = {
  User,
  Report,
  DoctorPatient,
};
