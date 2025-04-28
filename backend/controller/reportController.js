const Report = require('../models/report');  
const User = require('../models/user');  


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


const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        { model: User, as: 'doctor', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'patient', attributes: ['id', 'username', 'email'] }
      ]
    });

    console.log(reports); 
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Gabim në marrjen e raporteve', error });
  }
};


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


const getMyReports = async (req, res) => {
  try {
    const patientId = req.user.id;
    
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
  getMyReports 
};
