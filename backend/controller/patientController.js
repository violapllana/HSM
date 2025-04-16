const User = require('../models/user'); // Supozojmë që modelin "User" mund ta përdorim gjithashtu për pacientët

const createPatient = async (req, res) => {
  try {
    const { username, email, password, age, gender, medicalHistory } = req.body;

    const newPatient = await User.create({
      username,
      email,
      password,
      role: "patient",
      age,
      gender,
      medicalHistory
    });

    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error details:", error); // Log error to server console
    res.status(500).json({ message: 'Gabim në krijimin e pacientit', error: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    // Merr vetëm përdoruesit me rolin "patient"
    const patients = await User.findAll({ where: { role: "patient" } });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e pacientëve', error });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await User.findOne({ where: { id, role: "patient" } });

    if (!patient) {
      return res.status(404).json({ message: 'Pacienti nuk u gjet' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e pacientit', error });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, age, gender, medicalHistory } = req.body;

    const patient = await User.findOne({ where: { id, role: "patient" } });

    if (!patient) {
      return res.status(404).json({ message: 'Pacienti nuk u gjet' });
    }

    patient.username = username || patient.username;
    patient.email = email || patient.email;
    patient.password = password || patient.password;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.medicalHistory = medicalHistory || patient.medicalHistory;

    await patient.save();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e pacientit', error });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await User.findOne({ where: { id, role: "patient" } });

    if (!patient) {
      return res.status(404).json({ message: 'Pacienti nuk u gjet' });
    }

    await patient.destroy();
    res.status(200).json({ message: 'Pacienti u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirjen e pacientit', error });
  }
};

module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
