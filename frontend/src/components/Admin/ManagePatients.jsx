import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientPanel = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [patients, setPatients] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const apiUrl = 'http://localhost:5000/api/patient';

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiUrl);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newPatient = { username, email, phone };
      await axios.post(apiUrl, newPatient);
      fetchPatients();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setCurrentPatientId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching patient for edit:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPatient = { username, email, phone };
      await axios.put(`${apiUrl}/${currentPatientId}`, updatedPatient);
      fetchPatients();
      setIsEditMode(false);
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${patientToDelete}`);
      fetchPatients();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPhone('');
    setCurrentPatientId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Patient List
        <button
          onClick={() => {
            setIsEditMode(false);
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Patient
        </button>
      </h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {patients.map((patient, index) => (
            <tr key={patient.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{patient.id}</td> {/* ID e pacientit */}
              <td className="px-6 py-4">{patient.username}</td> {/* Username i pacientit */}
              <td className="px-6 py-4">{patient.email}</td>
              <td className="px-6 py-4">{patient.phone}</td>
              <td className="px-6 py-4 flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(patient.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setPatientToDelete(patient.id);
                    setShowDeleteModal(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this patient?</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Yes, Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Update Patient' : 'Create New Patient'}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Patient' : 'Create Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPanel;
