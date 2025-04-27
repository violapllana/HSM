import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientAndDoctorPanel = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [connections, setConnections] = useState([]); // State to store connections
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [filterBy, setFilterBy] = useState('patient');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('');

  const apiUrlPatient = 'http://localhost:5000/api/patient';
  const apiUrlDoctor = 'http://localhost:5000/api/doctor';
  const apiUrlConnect = 'http://localhost:5000/api/connect';
  const apiUrlConnections = 'http://localhost:5000/api/connect';

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiUrlPatient);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(apiUrlDoctor);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await axios.get(apiUrlConnections);
      setConnections(response.data); // Assuming you use setConnections to update the state
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchConnections();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (column) => {
    const sortedData = [...(filterBy === 'patient' ? patients : doctors)].sort((a, b) => {
      if (a[column] < b[column]) return sortBy === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortBy === 'asc' ? 1 : -1;
      return 0;
    });
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    if (filterBy === 'patient') {
      setPatients(sortedData);
    } else {
      setDoctors(sortedData);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.username.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.username.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle doctor-patient connection
  const handleConnect = async () => {
    if (!selectedDoctor || !selectedPatient) {
      setConnectionStatus('Please select both a doctor and a patient.');
      return;
    }

    // Check if the connection already exists
    const existingConnection = connections.find(
      (conn) =>
        conn.doctor.id === selectedDoctor && conn.patient.id === selectedPatient
    );

    if (existingConnection) {
      setConnectionStatus('This doctor and patient are already connected.');
      return;
    }

    try {
      // Make the API call to create the connection
      const response = await axios.post(
        `${apiUrlConnect}/${selectedDoctor}/${selectedPatient}`
      );

      setConnectionStatus(response.data.message || 'Successfully connected.');
      fetchConnections(); // Refresh the connections list after successful connection
      setSelectedDoctor(null); // Reset selections
      setSelectedPatient(null);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setConnectionStatus(error.response.data.message);
      } else {
        setConnectionStatus('Error connecting patient and doctor.');
      }
      console.error(error);
    }
  };

  const handleDeleteConnection = async (doctorId, patientId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this connection?');
  
    if (!isConfirmed) {
      return;
    }
  
    try {
      await axios.delete(`${apiUrlConnect}/${doctorId}/${patientId}`);
      setConnectionStatus('Connection deleted successfully.');
  
      // Directly update the connections state to remove the deleted connection
      setConnections((prevConnections) =>
        prevConnections.filter(
          (connection) =>
            connection.doctor.id !== doctorId || connection.patient.id !== patientId
        )
      );
    } catch (error) {
      console.error('Error deleting connection:', error);
      setConnectionStatus('Failed to delete connection.');
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Connect Doctor - Patient</h2>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
          </select>
          <button
            onClick={() => handleSort('username')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sort by Username
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {(filterBy === 'patient' ? filteredPatients : filteredDoctors).map((person) => (
            <tr key={person.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{person.id}</td>
              <td className="px-6 py-4">{person.username}</td>
              <td className="px-6 py-4">{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <div className="mb-4">
          <label htmlFor="doctor" className="block font-semibold">
            Choose a Doctor:
          </label>
          <select
            id="doctor"
            className="p-2 border rounded"
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="patient" className="block font-semibold">
            Choose a Patient:
          </label>
          <select
            id="patient"
            className="p-2 border rounded"
            onChange={(e) => setSelectedPatient(Number(e.target.value))}
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.username}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConnect}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Connect
        </button>
        {connectionStatus && (
          <p className="mt-4 text-red-500">{connectionStatus}</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Existing Connections</h3>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md mt-4">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {connections.map((connection) => (
              <tr key={connection.doctorId + "-" + connection.patientId}>
                <td className="px-6 py-4">
                  {connection.doctor ? `${connection.doctor.username} (${connection.doctor.email})` : 'No doctor'}
                </td>
                <td className="px-6 py-4">
                  {connection.patient ? `${connection.patient.username} (${connection.patient.email})` : 'No patient'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteConnection(connection.doctorId, connection.patientId)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientAndDoctorPanel;
