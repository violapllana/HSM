const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Regex për validimin e password-it (fillon me shkronjë të madhe, numër, karakter special, min 8 karaktere)
const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
// Create a new user (patient, doctor, or admin)
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme (username, email, password, role).' });
    }

    if (!['patient', 'doctor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Roli duhet të jetë patient, doctor ose admin.' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Passwordi duhet të fillojë me shkronjë të madhe, të ketë të paktën 8 karaktere, një numër dhe një karakter special.',
      });
    }

    // ... pjesa tjetër e kodit
  } catch (error) {
    // handle error
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });
    }

    if (role && !['patient', 'doctor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Roli i dhënë nuk është valid.' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'Passwordi duhet të fillojë me shkronjë të madhe, të ketë të paktën 8 karaktere, një numër dhe një karakter special.',
        });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e përdoruesit', error });
  }
};

// Get all users or filter by role (optional query param: role)
const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let whereCondition = {};
    if (role) {
      if (!['patient', 'doctor', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Roli i dhënë nuk është valid.' });
      }
      whereCondition.role = role;
    }
    const users = await User.findAll({ where: whereCondition });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesve', error });
  }
};

// Get user by ID and optionally check role
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e përdoruesit', error });
  }
};


// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'Përdoruesi nuk u gjet' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Përdoruesi u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirjen e përdoruesit', error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
