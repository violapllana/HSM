// const Report = require('../models/report');  // Importojmë modelin e raportit
// const User = require('../models/user');  // Importojmë modelin e përdoruesit për mjekun dhe pacientin

// // Krijo një raport të ri
// const createReport = async (req, res) => {
//   try {
//     const { title, patientId, diagnosis, treatment, doctorId, description, status, comments } = req.body;

//     const report = await Report.create({
//       title,
//       patientId,
//       diagnosis,
//       treatment,
//       doctorId,
//       description,
//       status,
//       comments
//     });

//     res.status(201).json(report);
//   } catch (error) {
//     console.error('Error creating report:', error);
//     res.status(500).json({ message: 'Gabim në krijimin e raportit', error: error.message });
//   }
// };

// const getReports = async (req, res) => {
//   try {
//     const reports = await Report.findAll({
//       include: [
//         { model: User, as: 'doctor', attributes: ['username', 'email'] },
//         { model: User, as: 'patient', attributes: ['username', 'email'] }
//       ]
//     });

//     console.log(reports); // Log the reports to verify data
//     res.status(200).json(reports);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në marrjen e raporteve', error });
//   }
// };


// // Merr një raport sipas ID-së
// const getReportById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const report = await Report.findOne({
//       where: { id },
//       include: [
//         { model: User, as: 'doctor', attributes: ['username', 'email'] },
//         { model: User, as: 'patient', attributes: ['username', 'email'] }
//       ]
//     });

//     if (!report) {
//       return res.status(404).json({ message: 'Raporti nuk u gjet' });
//     }

//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në marrjen e raportit', error });
//   }
// };

// const getReportsByPatientId = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const reports = await Report.findAll({
//       where: { patientId },
//       include: [
//         { model: User, as: 'doctor', attributes: ['username', 'email'] },  // Include doctor details
//         { model: User, as: 'patient', attributes: ['username', 'email'] }   // Include patient details
//       ]
//     });

//     if (reports.length === 0) {
//       return res.status(404).json({ message: 'Asnjë raport nuk u gjet për këtë pacient.' });
//     }

//     res.status(200).json(reports);
//   } catch (error) {
//     console.error('Gabim gjatë marrjes së raporteve:', error);
//     res.status(500).json({ message: 'Gabim në server' });
//   }
// };

// // Përditëso një raport
// const updateReport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, patientId, diagnosis, treatment, doctorId, description, status, comments } = req.body;

//     const report = await Report.findOne({ where: { id } });

//     if (!report) {
//       return res.status(404).json({ message: 'Raporti nuk u gjet' });
//     }

//     report.title = title || report.title;
//     report.patientId = patientId || report.patientId;
//     report.diagnosis = diagnosis || report.diagnosis;
//     report.treatment = treatment || report.treatment;
//     report.doctorId = doctorId || report.doctorId;
//     report.description = description || report.description;
//     report.status = status || report.status;
//     report.comments = comments || report.comments;

//     await report.save();

//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në përditësimin e raportit', error });
//   }
// };

// // Fshi një raport
// const deleteReport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const report = await Report.findOne({ where: { id } });

//     if (!report) {
//       return res.status(404).json({ message: 'Raporti nuk u gjet' });
//     }

//     await report.destroy();
//     res.status(200).json({ message: 'Raporti u fshi me sukses' });
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim në fshirjen e raportit', error });
//   }
// };
// // Funksioni që merr raportet për pacientin e loguar
// const getMyReports = async (req, res) => {
//   try {
//     const patientId = req.user.id; // Merr id-në e pacientit nga token-i
    
//     // Merr raportet që i përkasin pacientit
//     const reports = await Report.findAll({
//       where: { patientId },
//       include: [
//         { model: User, as: 'doctor', attributes: ['username', 'email'] },
//         { model: User, as: 'patient', attributes: ['username', 'email'] }
//       ]
//     });

//     if (reports.length === 0) {
//       return res.status(404).json({ message: 'Asnjë raport nuk u gjet për këtë pacient.' });
//     }

//     res.status(200).json(reports);
//   } catch (error) {
//     console.error('Gabim gjatë marrjes së raporteve:', error);
//     res.status(500).json({ message: 'Gabim në server' });
//   }
// };

// module.exports = {
//   createReport,
//   getReports,
//   getReportById,
//   getReportsByPatientId,
//   updateReport,
//   deleteReport,
//   getMyReports // Sigurohuni që kjo funksion të eksportohet
// };

// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');


// const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;  

    
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10); 
//     const user = await User.create({ username, email, password: hashedPassword, role: 'patient' });

//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     console.error('Registration error:', error);  
//     res.status(400).json({ error: error.message });
//   }
// };


// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
//     }

//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     // const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     // // Ensure the response includes the user data
//     // res.json({ message: 'Login successful', token, user: { id: user.id, role: user.role } }); // Include 'user' object explicitly


//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Vendos tokenin në cookie
//     res.cookie('ubtsecured', token, {
//       httpOnly: true,
//       secure: false, // Bëje true në production
//       sameSite: 'Lax',
//       maxAge: 60 * 60 * 1000 // 1 orë
//     });
    
//     // Dërgo vetëm user-in në response, jo tokenin
//     res.json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, { attributes: ['id', 'username', 'email', 'role'] });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { register, login, getUserProfile };
const Report = require('../models/report');  // Importojmë modelin e raportit
const User = require('../models/user');  // Importojmë modelin e përdoruesit për mjekun dhe pacientin

// Krijo një raport të ri
const createReport = async (req, res) => {
  try {
    const { title, patientId, diagnosis, treatment, doctorId, description, status, comments } = req.body;

    const report = await Report.create({
      title,
      patientId,
      diagnosis,
      treatment,
      doctorId,
      description,
      status,
      comments
    });

    // Kthe të dhënat e raportit, përfshirë të dhënat e përdoruesve
    const fullReport = await Report.findOne({
      where: { id: report.id },
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }
      ]
    });

    res.status(201).json(fullReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Gabim në krijimin e raportit', error: error.message });
  }
};

// Merr të gjitha raportet
const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }
      ]
    });

    console.log(reports); // Log the reports to verify data
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e raporteve', error });
  }
};

// Merr një raport sipas ID-së
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({
      where: { id },
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }
      ]
    });

    if (!report) {
      return res.status(404).json({ message: 'Raporti nuk u gjet' });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e raportit', error });
  }
};

// Merr raportet për një pacient
const getReportsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reports = await Report.findAll({
      where: { patientId },
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },  // Include doctor details
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }   // Include patient details
      ]
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: 'Asnjë raport nuk u gjet për këtë pacient.' });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error('Gabim gjatë marrjes së raporteve:', error);
    res.status(500).json({ message: 'Gabim në server' });
  }
};

// Përditëso një raport
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, patientId, diagnosis, treatment, doctorId, description, status, comments } = req.body;

    const report = await Report.findOne({ where: { id } });

    if (!report) {
      return res.status(404).json({ message: 'Raporti nuk u gjet' });
    }

    report.title = title || report.title;
    report.patientId = patientId || report.patientId;
    report.diagnosis = diagnosis || report.diagnosis;
    report.treatment = treatment || report.treatment;
    report.doctorId = doctorId || report.doctorId;
    report.description = description || report.description;
    report.status = status || report.status;
    report.comments = comments || report.comments;

    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në përditësimin e raportit', error });
  }
};

// Fshi një raport
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({ where: { id } });

    if (!report) {
      return res.status(404).json({ message: 'Raporti nuk u gjet' });
    }

    await report.destroy();
    res.status(200).json({ message: 'Raporti u fshi me sukses' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim në fshirjen e raportit', error });
  }
};

// Funksioni që merr raportet për pacientin e loguar
const getMyReports = async (req, res) => {
  try {
    const patientId = req.user.id; // Merr id-në e pacientit nga token-i
    
    // Merr raportet që i përkasin pacientit
    const reports = await Report.findAll({
      where: { patientId },
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }
      ]
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: 'Asnjë raport nuk u gjet për këtë pacient.' });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error('Gabim gjatë marrjes së raporteve:', error);
    res.status(500).json({ message: 'Gabim në server' });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  getReportsByPatientId,
  updateReport,
  deleteReport,
  getMyReports // Sigurohuni që kjo funksion të eksportohet
};
