const User = require('../models/user');

const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newAdmin = await User.create({
      username,
      email,
      password,
      role: "admin"
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error details:", error);  // Log error to server console
    res.status(500).json({ message: 'Gabim në krijimin e adminit', error: error.message });
  }
};


const getAdmins = async (req, res) => {
  try {
    // Merr vetëm përdoruesit me rolin "admin"
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

    const admin = await User.findOne({ where: { id, role: "admin" } });

    if (!admin) {
      return res.status(404).json({ message: 'Admini nuk u gjet' });
    }

    admin.username = username || admin.username;
    admin.email = email || admin.email;
    admin.password = password || admin.password;

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
