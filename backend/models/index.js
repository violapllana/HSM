// const User = require('./user');
// const Report = require('./report');
// const DoctorPatient = require('./doctorpatient');



// // Krijimi i lidhjeve
// Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
// Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });

// User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
// User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });



// // Lidhja shumë-në-shumë midis mjekut dhe pacientit
// User.belongsToMany(User, {
//   through: DoctorPatient,
//   foreignKey: 'doctorId',
//   otherKey: 'patientId',
//   as: 'patients',
// });
// User.belongsToMany(User, {
//   through: DoctorPatient,
//   foreignKey: 'patientId',
//   otherKey: 'doctorId',
//   as: 'doctors',
// });


// module.exports = {
//   User,
//   Report,
//   DoctorPatient,
// };



// const User = require('./user');
// const Appointment = require('./appointment');
// const Department = require('./department');
// const DoctorDepartment = require('./DoctorDepartment');
// const Report = require('./report');
// const DoctorPatient = require('./doctorpatient');

// // Krijimi i lidhjeve
// Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
// Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });

// User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
// User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });

// // Lidhja shumë-në-shumë midis mjekut dhe pacientit
// User.belongsToMany(User, {
//   through: DoctorPatient,
//   foreignKey: 'doctorId',
//   otherKey: 'patientId',
//   as: 'patients',
// });
// User.belongsToMany(User, {
//   through: DoctorPatient,
//   foreignKey: 'patientId',
//   otherKey: 'doctorId',
//   as: 'doctors',
// });

// // Lidhja mes doktorëve dhe departamenteve
// User.belongsToMany(Department, {
//   through: DoctorDepartment,
//   foreignKey: 'doctorId',
//   otherKey: 'departmentId',
//   as: 'departments',
// });

// Department.belongsToMany(User, {
//   through: DoctorDepartment,
//   foreignKey: 'departmentId',
//   otherKey: 'doctorId',
//   as: 'doctors',
// });

// // Lidhjet për Appointment (aliasat ndryshuar për të shmangur konfliktet)
// Appointment.belongsTo(User, { as: 'appointmentPatient', foreignKey: 'patientId' });
// Appointment.belongsTo(User, { as: 'appointmentDoctor', foreignKey: 'doctorId' });
// Appointment.belongsTo(Department, { foreignKey: 'departmentId', as: 'appointmentDepartment' });

// module.exports = {
//   User,
//   Appointment,
//   Department,
//   DoctorDepartment,
//   Report,
//   DoctorPatient,
// };
// associations/index.js
const User = require('./user');
const Appointment = require('./appointment');
const Department = require('./department');
const DoctorDepartment = require('./DoctorDepartment');
const Report = require('./report');
const DoctorPatient = require('./doctorpatient');

// Report Associations
Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });

// Doctor-Patient Many-to-Many
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

// Optional access to join table directly
DoctorPatient.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
DoctorPatient.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
User.hasMany(DoctorPatient, { as: 'doctorConnections', foreignKey: 'doctorId' });
User.hasMany(DoctorPatient, { as: 'patientConnections', foreignKey: 'patientId' });

// Doctor-Department
User.belongsToMany(Department, {
  through: DoctorDepartment,
  foreignKey: 'doctorId',
  otherKey: 'departmentId',
  as: 'departments',
});
Department.belongsToMany(User, {
  through: DoctorDepartment,
  foreignKey: 'departmentId',
  otherKey: 'doctorId',
  as: 'doctors',
});

// Appointment
Appointment.belongsTo(User, { as: 'appointmentPatient', foreignKey: 'patientId' });
Appointment.belongsTo(User, { as: 'appointmentDoctor', foreignKey: 'doctorId' });
Appointment.belongsTo(Department, { foreignKey: 'departmentId', as: 'appointmentDepartment' });

module.exports = {
  User,
  Appointment,
  Department,
  DoctorDepartment,
  Report,
  DoctorPatient,
};
