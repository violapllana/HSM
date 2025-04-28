const { Department, User } = require('../models'); 


const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).send('Internal server error');
  }
};


const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }

    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: 'Gabim në marrjen e departamentit', error: err.message });
  }
};


const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme' });
    }

    const newDepartment = await Department.create({ name, description });
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të departamentit', error: err.message });
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }

    department.name = name || department.name;
    department.description = description || department.description;

    await department.save();
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: 'Gabim gjatë përditësimit', error: err.message });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }

    await department.destroy();
    res.status(200).json({ message: 'Departamenti u fshi me sukses' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së departamentit', error: err.message });
  }
};


const getDoctorsByDepartment = async (req, res) => {
  const { id } = req.params;

  try {

    const department = await Department.findByPk(id, {
      include: {
        model: User, 
        as: 'doctors' 
      }
    });

    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }


    res.json(department.doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Gabim gjatë marrjes së doktorëve');
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDoctorsByDepartment,
};
