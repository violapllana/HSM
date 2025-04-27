const User = require('../models/user');
const DoctorPatient = require('../models/doctorpatient');

const createConnection = async (req, res) => {
  const { doctorId, patientId } = req.params; 
  try {
    const doctor = await User.findByPk(doctorId);
    const patient = await User.findByPk(patientId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid doctor.' });
    }

    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: 'Invalid patient.' });
    }

    const existingConnection = await DoctorPatient.findOne({
      where: { doctorId, patientId }
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists.' });
    }

    await doctor.addPatient(patient);

    return res.status(200).json({ message: 'Successfully connected doctor and patient.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getAllConnections = async (req, res) => {
  try {
    const connections = await DoctorPatient.findAll({
      include: [
        { model: User, as: 'doctor', attributes: ['username', 'email'] },
        { model: User, as: 'patient', attributes: ['username', 'email'] },
      ],
    });

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
};

const getConnectionById = async (req, res) => {
  const { doctorId, patientId } = req.params; 

  try {
    const connection = await DoctorPatient.findOne({
      where: { doctorId, patientId }
    });

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    res.status(200).json(connection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const updateConnection = async (req, res) => {
  const { doctorId, patientId } = req.params;

  try {
    const connection = await DoctorPatient.findOne({
      where: { doctorId, patientId }
    });

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    connection.doctorId = doctorId;
    connection.patientId = patientId;

    await connection.save();

    return res.status(200).json({ message: 'Connection updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
const getConnectedPatients = async (req, res) => {
  const doctorId = req.user.id; 

  try {
    const connections = await DoctorPatient.findAll({
      where: { doctorId },
      include: [
        { model: User, as: 'patient', attributes: ['username', 'email'] },
      ],
    });

    if (connections.length === 0) {
      return res.status(404).json({ message: 'No connected patients found.' });
    }

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connected patients:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
const getPatientsByDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    // Fetching all connections where the doctor is the one the patient is connected to
    const connections = await DoctorPatient.findAll({
      where: { doctorId },
      include: [{ model: User, as: 'patient', attributes: ['username', 'email'] }]
    });

    if (!connections.length) {
      return res.status(404).json({ message: 'No connected patients found for this doctor.' });
    }

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connected patients:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};





const deleteConnection = async (req, res) => {
  const { doctorId, patientId } = req.params; 

  try {
    const connection = await DoctorPatient.findOne({
      where: { doctorId, patientId }
    });

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found.' });
    }

    await connection.destroy();
    return res.status(200).json({ message: 'Connection deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getConnectedPatientsByPatientId = (req, res) => {
  const { patientId } = req.params;

  // Find connections where the patientId matches
  Connection.find({ patientId: patientId })
    .then(connections => {
      if (!connections || connections.length === 0) {
        // If no connections are found
        return res.status(404).json({ message: 'No connections found for this patient.' });
      }
      // Return the list of connections for the patient
      res.status(200).json(connections);
    })
    .catch(error => {
      // Handle errors such as database issues
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching connections.', error });
    });
};


module.exports = {
  createConnection,
  getAllConnections,
  getConnectionById,
  updateConnection,
  deleteConnection,
  getConnectedPatients,
  getPatientsByDoctor,
  getConnectedPatientsByPatientId,
};
