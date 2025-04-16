const User = require('../models/user');  // Përdor modelin për doktorin

const createDoctor = async (req, res) => {
  try {
    const { username, email, password, specialty, phone } = req.body;

    const newDoctor = await User.create({
      username,
      email,
      password,
      role: "doctor",  // Role është "doctor"
      specialty,
      phone
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Error details:", error);  // Log error to server console
    res.status(500).json({ message: 'Gabim në krijimin e doktorit', error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    // Merr vetëm përdoruesit me rolin "doctor"
    const doctors = await User.findAll({ where: { role: "doctor" } });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e doktorëve', error });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await User.findOne({ where: { id, role: "doctor" } });

    if (!doctor) {
      return res.status(404).json({ message: 'Doktori nuk u gjet' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e doktorit', error });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, specialty, phone } = req.body;

    const doctor = await User.findOne({ where: { id, role: "doctor" } });

    if (!doctor) {
      return res.status(404).json({ message: 'Doktori nuk u gjet' });
    }

    doctor.username = username || doctor.username;
    doctor.email = email || doctor.email;
    doctor.password = password || doctor.password;
    doctor.specialty = specialty || doctor.specialty;
    doctor.phone = phone || doctor.phone;

    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e doktorit', error });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await user.findOne({ where: { id, role: "doctor" } });

    if (!doctor) {
      return res.status(404).json({ message: 'Doktori nuk u gjet' });
    }

    await doctor.destroy();
    res.status(200).json({ message: 'Doktori u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirjen e doktorit', error });
  }
};

module.exports = { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
