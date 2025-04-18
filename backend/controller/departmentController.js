// const Department  = require('../models/department');

// const getDepartments = async (req, res) => {
//   try {
//     const departments = await Department.findAll({
//       attributes: ['id', 'name', 'description'], // Vetëm 'name' dhe 'description' do të kthehen
//     });
//     res.status(200).json(departments);
//   } catch (err) {
//     res.status(500).json({ message: 'Gabim në marrjen e departamenteve', error: err.message });
//   }
// };

// const getDepartmentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const department = await Department.findByPk(id);

//     if (!department) {
//       return res.status(404).json({ message: 'Departamenti nuk u gjet' });
//     }

//     res.status(200).json(department); // Kthejme të gjitha të dhënat për departamentin
//   } catch (err) {
//     res.status(400).json({ message: 'Gabim në marrjen e departamentit', error: err.message });
//   }
// };

// // Kthejme edhe funksionet e tjera si create, update dhe delete, por nuk do t'i përdorim për këtë detyrë.
// module.exports = {
//   getDepartments,
//   getDepartmentById,
// };
const { Department, User } = require('../models'); // Sigurohuni që keni importuar modelet tuaja

// Merr të gjithë departamentet
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).send('Internal server error');
  }
};

// Merr një departament sipas ID
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

// Krijo një departament të ri
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

// Përditëso një departament ekzistues
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

// Fshij një departament
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

// Funksioni për të marrë doktorët nga një departament
const getDoctorsByDepartment = async (req, res) => {
  const { id } = req.params; // ID e departamentit nga rruga

  try {
    // Kërkojmë departamentin me ID të dhënë dhe ngarkojmë doktorët që i përkasin
    const department = await Department.findByPk(id, {
      include: {
        model: User, // Kjo është nëse doktorët janë të lidhur me modelin 'User'
        as: 'doctors' // Ose një alias që përdorni për doktorët
      }
    });

    if (!department) {
      return res.status(404).json({ message: 'Departamenti nuk u gjet' });
    }

    // Dërgojmë listën e doktorëve
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
  getDoctorsByDepartment, // Eksporto këtë funksion
};
