import { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [patientId, setPatientId] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null); // 'connect' ose 'disconnect'
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const apiUrlDoctors = 'http://localhost:5000/api/doctor';
  const apiUrlConnections = 'http://localhost:5000/api/connect'; 

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('user'));
    if (patient && patient.id) {
      setPatientId(patient.id);
    }
  }, []);

  useEffect(() => {
    if (!patientId) return;

    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrlDoctors);
        setDoctors(res.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchConnections = async () => {
      try {
        const res = await axios.get(apiUrlConnections);
        const patientConnections = res.data.filter(conn => conn.patientId === patientId);
        setConnections(patientConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchDoctors();
    fetchConnections();
  }, [patientId]);

  const refreshConnections = async () => {
    try {
      const res = await axios.get(apiUrlConnections);
      const patientConnections = res.data.filter(conn => conn.patientId === patientId);
      setConnections(patientConnections);
    } catch (err) {
      console.error('Error refreshing connections:', err);
    }
  };

  // Funksionet që thërriten pas konfirmimit në modal
  const confirmConnect = async () => {
    if (!selectedDoctor) return;
    try {
      await axios.post(`${apiUrlConnections}/${selectedDoctor.id}/${patientId}`);
      await refreshConnections();
      closeModal();
    } catch (error) {
      console.error('Error connecting:', error);
      alert(error.response?.data?.message || 'Error during connection');
      closeModal();
    }
  };

  const confirmDisconnect = async () => {
    if (!selectedDoctor) return;
    try {
      await axios.delete(`${apiUrlConnections}/${selectedDoctor.id}/${patientId}`);
      await refreshConnections();
      closeModal();
    } catch (error) {
      console.error('Error disconnecting:', error);
      alert(error.response?.data?.message || 'Error during disconnection');
      closeModal();
    }
  };

  const openModal = (action, doctor) => {
    setModalAction(action); 
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoctor(null);
    setModalAction(null);
  };

  const isConnected = (doctorId) =>
    connections.some(
      (conn) =>
        (conn.doctor?.id === doctorId || conn.doctorId === doctorId) &&
        (conn.patient?.id === patientId || conn.patientId === patientId)
    );

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Connect - Disconnect with Doctors</h1>

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
          onClick={refreshConnections}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Refresh Connections
        </button>
      </div>

      <hr className="mb-6 border-gray-400" />

      {loading ? (
        <p className="text-center text-lg text-blue-600">Loading doctors and connections...</p>
      ) : (
        <>
          <p className="text-center text-lg text-green-600 mb-4">
            You are connected with {connections.length} doctor{connections.length !== 1 ? 's' : ''}.
          </p>

          {/* Connected Doctors */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Connected Doctors</h2>
            {connections.length > 0 ? (
              connections.map((conn) => {
                const doctor = conn.doctor || {};
                return (
                  <div key={doctor.id || conn.doctorId} className="bg-white border p-6 mb-4 rounded shadow">
                    <h3 className="text-xl font-bold">{doctor.username}</h3>
                    {doctor.specialty && <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>}
                    <button
                      onClick={() => openModal('disconnect', doctor)}
                      className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-yellow-400"
                    >
                      Disconnect
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">You are not connected to any doctors.</p>
            )}
          </div>

          {/* Available Doctors */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Available Doctors</h2>
            {filteredDoctors.length > 0 ? (
              filteredDoctors
                .filter((doctor) => !isConnected(doctor.id))
                .map((doctor) => (
                  <div key={doctor.id} className="bg-white border p-6 mb-4 rounded shadow">
                    <h3 className="text-xl font-bold">{doctor.username}</h3>
                    {doctor.specialty && <p className="text-gray-700 mb-2">Specialty: {doctor.specialty}</p>}
                    <button
                      onClick={() => openModal('connect', doctor)}
                      className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-yellow-400"
                    >
                      Connect
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-gray-600">No doctors found.</p>
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {modalOpen && selectedDoctor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {modalAction === 'connect' ? (
              <>
                <h3 className="text-xl font-bold mb-4">Confirm Connection</h3>
                <p className="mb-6">
                  Do you want to connect with Dr. <strong>{selectedDoctor.username}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmConnect}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Connect
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Confirm Disconnection</h3>
                <p className="mb-6">
                  Are you sure you want to disconnect from Dr. <strong>{selectedDoctor.username}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDisconnect}
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Disconnect
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
