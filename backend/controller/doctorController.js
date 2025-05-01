
const Doctor = require('../models/user');  // Mund ta ndryshosh nëse përdor një model të veçantë për doctor
const bcrypt = require('bcryptjs');

const createDoctor = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Të gjitha fushat (username, email, password) janë të detyrueshme.' });
    }

    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Passwordi duhet të fillojë me shkronjë të madhe, të përmbajë të paktën 8 karaktere, një numër dhe një karakter special.',
      });
    }

    const existingEmail = await Doctor.findOne({ where: { email } });
    const existingUsername = await Doctor.findOne({ where: { username } });

    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Username është në përdorim.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await Doctor.create({
      username,
      email,
      password: hashedPassword,
      role: 'doctor',  // Role changed to 'doctor'
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Gabim gjatë krijimit të doktorit:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      message: 'Gabim i brendshëm në server gjatë krijimit të doktorit.',
      error: error.message,
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({ where: { role: "doctor" } });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e doktorëve', error });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ where: { id, role: "doctor" } });

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
    const { username, email, password } = req.body;

    const doctor = await Doctor.findOne({ where: { id, role: 'doctor' } });
    if (!doctor) {
      return res.status(404).json({ message: 'Doktori nuk u gjet' });
    }

    doctor.username = username || doctor.username;
    doctor.email = email || doctor.email;

    if (password) {
      const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Passwordi duhet të fillojë me shkronjë të madhe, të përmbajë të paktën 8 karaktere, një numër dhe një karakter special.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      doctor.password = hashedPassword;
    }

    await doctor.save();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e doktorit', error });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ where: { id, role: "doctor" } });

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
