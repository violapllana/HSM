import { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectedList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 

  const apiUrlConnectedPatients = 'http://localhost:5000/api/connect/';

  const fetchConnectedPatients = async () => {
    try {
      const response = await axios.get(apiUrlConnectedPatients);
      setPatients(response.data);
    } catch (error) {
      setConnectionStatus('Error fetching connected patients.');
      console.error('Error fetching connected patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedPatients(); 
  }, []);

  const doctorId = localStorage.getItem("doctorId"); 

  const filteredPatients = doctorId
    ? patients
        .filter((connection) => connection.doctorId.toString() === doctorId)
        .filter((connection) => {
          const patient = connection.patient;
          if (patient) {
            return (
              patient.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
              patient.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          return false;
        })
    : [];

  if (loading) {
    return (
      <p className="text-center text-lg text-red-500">Loading data, please wait...</p>
    );
  }

  if (!doctorId) {
    return (
      <p className="text-center text-lg text-red-500">
        You must be logged in as a doctor to view connected patients.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Connected Patients</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div>
        {filteredPatients.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No connected patients for you.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPatients.map((connection) => {
              const patient = connection.patient; 

              return (
                <li key={connection.id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="space-y-2">
                    <div><strong className="text-indigo-600">Patient:</strong> {patient ? patient.username : 'N/A'}</div>
                    <div><strong className="text-indigo-600">Email:</strong> {patient ? patient.email : 'N/A'}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {connectionStatus && <p className="mt-4 text-red-500 text-center">{connectionStatus}</p>}
    </div>
  );
};

export default ConnectedList;
