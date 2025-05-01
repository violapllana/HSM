// const User = require('../models/user'); 

// const createPatient = async (req, res) => {
//   try {
//     const { username, email, password, age, gender, medicalHistory } = req.body;

//     const newPatient = await User.create({
//       username,
//       email,
//       password,
//       role: "patient",
//       age,
//       gender,
//       medicalHistory
//     });

//     res.status(201).json(newPatient);
//   } catch (error) {
//     console.error("Error details:", error); // Log error to server console
//     res.status(500).json({ message: 'Gabim në krijimin e pacientit', error: error.message });
//   }
// };

// const getPatients = async (req, res) => {
//   try {

//     const patients = await User.findAll({ where: { role: "patient" } });
//     res.status(200).json(patients);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në marrjen e pacientëve', error });
//   }
// };

// const getPatientById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const patient = await User.findOne({ where: { id, role: "patient" } });

//     if (!patient) {
//       return res.status(404).json({ message: 'Pacienti nuk u gjet' });
//     }

//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në marrjen e pacientit', error });
//   }
// };

// const updatePatient = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, email, password, age, gender, medicalHistory } = req.body;

//     const patient = await User.findOne({ where: { id, role: "patient" } });

//     if (!patient) {
//       return res.status(404).json({ message: 'Pacienti nuk u gjet' });
//     }

//     patient.username = username || patient.username;
//     patient.email = email || patient.email;
//     patient.password = password || patient.password;
//     patient.age = age || patient.age;
//     patient.gender = gender || patient.gender;
//     patient.medicalHistory = medicalHistory || patient.medicalHistory;

//     await patient.save();
//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në përditësimin e pacientit', error });
//   }
// };

// const deletePatient = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const patient = await User.findOne({ where: { id, role: "patient" } });

//     if (!patient) {
//       return res.status(404).json({ message: 'Pacienti nuk u gjet' });
//     }

//     await patient.destroy();
//     res.status(200).json({ message: 'Pacienti u fshi me sukses' });
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në fshirjen e pacientit', error });
//   }
// };

// module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
const Patient = require('../models/user');  // Mund ta ndryshosh nëse përdor një model të veçantë për patient
const bcrypt = require('bcryptjs');

const createPatient = async (req, res) => {
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

    const existingEmail = await Patient.findOne({ where: { email } });
    const existingUsername = await Patient.findOne({ where: { username } });

    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Username është në përdorim.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = await Patient.create({
      username,
      email,
      password: hashedPassword,
      role: 'patient',  // Role changed to 'patient'
    });

    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Gabim gjatë krijimit të pacientit:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      message: 'Gabim i brendshëm në server gjatë krijimit të pacientit.',
      error: error.message,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { role: "patient" } });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e pacientëve', error });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ where: { id, role: "patient" } });

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
    const { username, email, password } = req.body;

    const patient = await Patient.findOne({ where: { id, role: 'patient' } });
    if (!patient) {
      return res.status(404).json({ message: 'Pacienti nuk u gjet' });
    }

    patient.username = username || patient.username;
    patient.email = email || patient.email;

    if (password) {
      const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Passwordi duhet të fillojë me shkronjë të madhe, të përmbajë të paktën 8 karaktere, një numër dhe një karakter special.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      patient.password = hashedPassword;
    }

    await patient.save();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e pacientit', error });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ where: { id, role: "patient" } });

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
