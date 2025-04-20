
import { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState('');
  const patientId = 1; // Vendose dinamikisht nëse është i loguar

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctor');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/connect');
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchConnections();
  }, []);

  const handleSearch = () => {
    // opsionale: filtrimi bëhet nga input lokal për thjeshtësi
  };

  const handleConnect = async (doctorId) => {
    try {
      await axios.post('http://localhost:5000/api/connect', {
        doctorId,
        patientId,
      });
      fetchConnections();
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleDisconnect = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/connect/${doctorId}/${patientId}`);
      fetchConnections();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const isConnected = (doctorId) =>
    connections.some(
      (conn) =>
        conn.doctor?.id === doctorId && conn.patient?.id === patientId
    );

  const filteredDoctors = doctors.filter((doc) =>
    doc.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Manage Connections
      </h1>

      <label className="block font-bold text-lg mb-2">
        Search Doctor's Name
      </label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter doctor's name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded shadow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded shadow"
        >
          Search
        </button>
      </div>

      <hr className="mb-6 border-gray-400" />

      {filteredDoctors.map((doctor) => (
        <div
          key={doctor.id}
          className="bg-white border p-6 mb-6 rounded shadow"
        >
          <h2 className="text-xl font-bold">{doctor.username}</h2>
          <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>

          {isConnected(doctor.id) ? (
            <>
              <p className="text-green-600 mb-2">
                You are connected to this doctor.
              </p>
              <button
                onClick={() => handleDisconnect(doctor.id)}
                className="bg-red-600 text-white font-bold px-4 py-2 rounded"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => handleConnect(doctor.id)}
              className="bg-green-600 text-white font-bold px-4 py-2 rounded"
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
