// departmentController.js
const { Department } = require('../models/department');

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ['id', 'name', 'description'], // Vetëm 'name' dhe 'description' do të kthehen
    });
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Gabim në marrjen e departamenteve', error: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }

    res.status(200).json(department); // Kthejme të gjitha të dhënat për departamentin
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e departamentit', error: err.message });
  }
};

// Kthejme edhe funksionet e tjera si create, update dhe delete, por nuk do t'i përdorim për këtë detyrë.
module.exports = {
  getDepartments,
  getDepartmentById,
};
