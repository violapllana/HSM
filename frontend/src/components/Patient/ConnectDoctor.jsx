import { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const patientId = 1;  // Mund ta bësh dinamik në të ardhmen

  const apiUrlDoctors = 'http://localhost:5000/api/doctor';
  const apiUrlConnections = 'http://localhost:5000/api/connect/';

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrlDoctors);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${apiUrlConnections}patients/${patientId}`);
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const handleConnect = async (doctorId) => {
    try {
      await axios.post(`${apiUrlConnections}${doctorId}/${patientId}`);
      await fetchConnections();  // Prisni të rifreskohen lidhjet
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleDisconnect = async (doctorId) => {
    try {
      await axios.delete(`${apiUrlConnections}${doctorId}/${patientId}`);
      await fetchConnections();  // Rifresko lidhjet
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  // Kontrollo lidhjen duke parë nëse lidhja ekziston në listë
  const isConnected = (doctorId) =>
    connections.some(
      (conn) =>
        // Në varësi të formës së të dhënave nga API, mund ta ndryshosh këtë:
        (conn.doctor?.id === doctorId || conn.doctorId === doctorId) &&
        (conn.patient?.id === patientId || conn.patientId === patientId)
    );

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.username.toLowerCase().includes(search.toLowerCase())
  );

  // Kaloja vetëm një herë në ngarkim, pasi patientId është konstant
  useEffect(() => {
    fetchDoctors();
    fetchConnections();
  }, []); 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Your Connected Doctors</h1>

      <label className="block font-bold text-lg mb-2">Search Doctor's Name</label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter doctor's name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded shadow"
        />
        <button
          onClick={fetchConnections}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Refresh Connections
        </button>
      </div>

      <hr className="mb-6 border-gray-400" />

      {loading ? (
        <p className="text-center text-lg text-blue-600">Loading doctors and connections...</p>
      ) : connections.length > 0 ? (
        <p className="text-center text-lg text-green-600">
          You are connected with {connections.length} doctor{connections.length > 1 ? 's' : ''}.
        </p>
      ) : (
        <p className="text-center text-lg text-gray-500">You are not connected to any doctors.</p>
      )}

      {filteredDoctors.length === 0 && !loading && (
        <p className="text-center text-lg text-gray-600">No doctors found.</p>
      )}

      {filteredDoctors.map((doctor) => (
        <div key={doctor.id} className="bg-white border p-6 mb-6 rounded shadow">
          <h2 className="text-xl font-bold">{doctor.username}</h2>
          <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>

          {isConnected(doctor.id) ? (
            <>
              <p className="text-green-600 mb-2">You are connected to this doctor.</p>
              <button
                onClick={() => handleDisconnect(doctor.id)}
                className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-yellow-400"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => handleConnect(doctor.id)}
              className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-yellow-400"
            >
              Connect
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConnectDoctor;
