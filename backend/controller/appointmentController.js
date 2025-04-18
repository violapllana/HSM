
const Appointment = require('../models/appointment'); // Sigurohuni që ky është rruga e saktë për modelin tuaj

// Merr të gjitha takimet
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      attributes: ['id', 'patientId', 'doctorId', 'departmentId', 'date', 'reason'], // Përdorim 'date' dhe 'reason'
    });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Gabim në marrjen e takimeve', error: err.message });
  }
};

// Merr një takim sipas ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Takimi nuk u gjet' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e takimit', error: err.message });
  }
};

// Krijo një takim të ri
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, departmentId, date, reason } = req.body;

    if (!patientId || !doctorId || !departmentId || !date) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme' });
    }

    // Kontrollo nëse data është në format të saktë
    if (isNaN(new Date(date))) {
      return res.status(400).json({ message: 'Data e takimit është e pasaktë' });
    }

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      departmentId,
      date, // Përdorim 'date' në vend të 'appointmentTime'
      reason, // Mund të jetë opsionale
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të takimit', error: err.message });
  }
};

// Përditëso një takim ekzistues
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, departmentId, date, reason } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Takimi nuk u gjet' });
    }

    // Përditësojmë të dhënat e takimit
    appointment.patientId = patientId || appointment.patientId;
    appointment.doctorId = doctorId || appointment.doctorId;
    appointment.departmentId = departmentId || appointment.departmentId;
    appointment.date = date || appointment.date; // Përdorim 'date' në vend të 'appointmentTime'
    appointment.reason = reason || appointment.reason;

    await appointment.save();
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Gabim gjatë përditësimit të takimit', error: err.message });
  }
};

// Fshij një takim
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Takimi nuk u gjet' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Takimi u fshi me sukses' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së takimit', error: err.message });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
