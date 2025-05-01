const User = require('../models/user');
const bcrypt = require('bcryptjs');


const createAdmin = async (req, res) => {
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

   
    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingEmail) {
      return res.status(400).json({ message: 'Emaili është në përdorim.' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Username është në përdorim.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newAdmin = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Gabim gjatë krijimit të adminit:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      message: 'Gabim i brendshëm në server gjatë krijimit të adminit.',
      error: error.message,
    });
  }
};
const getAdmins = async (req, res) => {
  try {

    const admins = await User.findAll({ where: { role: "admin" } });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e adminëve', error });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findOne({ where: { id, role: "admin" } });

    if (!admin) {
      return res.status(404).json({ message: 'Admini nuk u gjet' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e adminit', error });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;


    const admin = await User.findOne({ where: { id, role: 'admin' } });
    if (!admin) {
      return res.status(404).json({ message: 'Admini nuk u gjet' });
    }

    // Përditëso username dhe email
    admin.username = username || admin.username;
    admin.email = email || admin.email;

    // Verifikim i password-it nëse është e re
    if (password) {
      const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Passwordi duhet të fillojë me shkronjë të madhe, të përmbajë të paktën 8 karaktere, një numër dhe një karakter special.',
        });
      }
      
      // Hash passwordin e ri
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Ruaj ndryshimet e adminit
    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e adminit', error });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findOne({ where: { id, role: "admin" } });

    if (!admin) {
      return res.status(404).json({ message: 'Admini nuk u gjet' });
    }

    await admin.destroy();
    res.status(200).json({ message: 'Admini u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirjen e adminit', error });
  }
};

module.exports = { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin };
