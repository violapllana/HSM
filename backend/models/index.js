const User = require('./user');
const Appointment = require('./appointment');
const Department = require('./department');
const DoctorDepartment = require('./DoctorDepartment');
const Report = require('./report');
const DoctorPatient = require('./doctorpatient');


Report.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
Report.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
User.hasMany(Report, { as: 'doctorReports', foreignKey: 'doctorId' });
User.hasMany(Report, { as: 'patientReports', foreignKey: 'patientId' });


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


DoctorPatient.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });
DoctorPatient.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });
User.hasMany(DoctorPatient, { as: 'doctorConnections', foreignKey: 'doctorId' });
User.hasMany(DoctorPatient, { as: 'patientConnections', foreignKey: 'patientId' });


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
