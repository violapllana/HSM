import { useState, useEffect } from "react";
import axios from "axios";

const ConnectedList = ({ setActiveTab }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const apiUrlConnectedPatients = "http://localhost:5000/api/connect";
  const doctorId = localStorage.getItem("doctorId");

  const fetchConnectedPatients = async () => {
    try {
      const response = await axios.get(apiUrlConnectedPatients);
      setPatients(response.data || []);
      if (!response.data || response.data.length === 0) {
        setConnectionStatus("No connected patients found.");
      }
    } catch (error) {
      setConnectionStatus("Error fetching connected patients.");
      console.error("Error fetching connected patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedPatients();
  }, []);

  const filterBySearch = (connection) => {
    const patient = connection.patient;
    return (
      patient &&
      (patient.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredPatients = doctorId
    ? patients
        .filter((c) => c.doctorId.toString() === doctorId)
        .filter(filterBySearch)
    : [];

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500 animate-pulse">
        Loading...
      </p>
    );
  }

  if (!doctorId) {
    return (
      <p className="text-center text-lg text-red-500">
        You must be logged in as a doctor to view connected patients.
      </p>
    );
  }

  const handleCreateReport = () => {
    setActiveTab("createreport");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Connected Patients
      </h2>

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
          <p className="text-center text-lg text-gray-500">
            No connected patients for you.
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredPatients.map((connection) => {
              const patient = connection.patient;

              return (
                <li
                  key={connection.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="space-y-2">
                    <div>
                      <strong className="text-indigo-600">Patient:</strong>{" "}
                      {patient?.username || "N/A"}
                    </div>
                    <div>
                      <strong className="text-indigo-600">Email:</strong>{" "}
                      {patient?.email || "N/A"}
                    </div>
                   
<div className="flex flex-col justify-center items-end ">
                      <button
                        onClick={handleCreateReport}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Create Report
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConnectedList;
