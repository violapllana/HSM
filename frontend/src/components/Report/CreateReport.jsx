import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientReportPanel = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [doctorId, setDoctorId] = useState(''); // ID e doktorit që do të merret automatikisht
  const [reportData, setReportData] = useState({
    title: '',
    diagnosis: '',
    treatment: '',
    description: '',
    status: 'In Progress',
    comments: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const apiUrlPatients = 'http://localhost:5000/api/patient';
  const apiUrlReport = 'http://localhost:5000/api/report';

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(apiUrlPatients);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    // Merrni ID-në e doktorit nga localStorage (ose nga cookies)
    const doctor = JSON.parse(localStorage.getItem('user')); // Mendohet që 'user' është objekti që përmban të dhënat e doktorit
    if (doctor && doctor.id) {
      setDoctorId(doctor.id); // Vendosni ID-në automatikisht në doctorId
    }

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedPatientId || !doctorId) {
      setStatusMessage('Please select a patient and enter doctor ID.');
      return;
    }

    try {
      const response = await axios.post(apiUrlReport, {
        ...reportData,
        patientId: selectedPatientId,
        doctorId: doctorId
      });

      setStatusMessage('Report sent successfully!');
      setReportData({
        title: '',
        diagnosis: '',
        treatment: '',
        description: '',
        status: 'In Progress',
        comments: ''
      });
      setSelectedPatientId('');
    } catch (error) {
      console.error('Error submitting report:', error);
      setStatusMessage('Failed to send report.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Send Report to Patient</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Patient:</label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select a patient --</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.username}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor ID now automatically set */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          readOnly // Nuk lejohet të ndryshohet manualisht
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={reportData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Diagnosis:</label>
        <input
          type="text"
          name="diagnosis"
          value={reportData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Treatment:</label>
        <input
          type="text"
          name="treatment"
          value={reportData.treatment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description:</label>
        <textarea
          name="description"
          value={reportData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Status:</label>
        <select
          name="status"
          value={reportData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Comments:</label>
        <textarea
          name="comments"
          value={reportData.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Send Report
      </button>

      {statusMessage && (
        <p className="mt-4 text-green-600 font-semibold">{statusMessage}</p>
      )}
    </div>
  );
};

export default PatientReportPanel;
