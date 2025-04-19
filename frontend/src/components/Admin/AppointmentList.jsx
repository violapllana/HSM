import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null); // State për edituar takimin

  const apiUrlAppointments = 'http://localhost:5000/api/appointments';
  const apiUrlPatients = 'http://localhost:5000/api/patient';
  const apiUrlDoctors = 'http://localhost:5000/api/doctor';
  const apiUrlDepartments = 'http://localhost:5000/api/department';

  // Fetch data
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(apiUrlAppointments);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiUrlPatients);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(apiUrlDoctors);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrlDepartments);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
    fetchDepartments();
  }, []);

  // Handle deleting an appointment
  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`${apiUrlAppointments}/${appointmentId}`);
      setConnectionStatus('Appointment successfully deleted.');
      fetchAppointments(); // Refresh appointments after delete
    } catch (error) {
      setConnectionStatus('Error deleting appointment.');
      console.error(error.message);
    }
  };

  // Handle editing an appointment
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment); // Set the appointment to edit
  };

  // Handle updating the appointment
  const handleUpdate = async () => {
    try {
      const updatedAppointment = {
        ...editingAppointment, // Preserve existing data
      };
      await axios.put(`${apiUrlAppointments}/${editingAppointment.id}`, updatedAppointment);
      setConnectionStatus('Appointment successfully updated.');
      fetchAppointments(); // Refresh appointments after update
      setEditingAppointment(null); // Close the modal
    } catch (error) {
      setConnectionStatus('Error updating appointment.');
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Scheduled Appointments</h2>

      {/* List of scheduled appointments */}
      <div>
        {appointments.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No appointments scheduled yet.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => {
              const patient = patients.find(p => p.id === appointment.patientId);
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              const department = departments.find(dep => dep.id === appointment.departmentId);

              return (
                <li key={appointment.id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <div className="space-y-2">
                    <div><strong className="text-indigo-600">Patient:</strong> {patient ? patient.username : 'N/A'}</div>
                    <div><strong className="text-indigo-600">Doctor:</strong> {doctor ? doctor.username : 'N/A'}</div>
                    <div><strong className="text-indigo-600">Department:</strong> {department ? department.name : 'N/A'}</div>
                    <div><strong className="text-indigo-600">Date:</strong> {appointment.date}</div>
                    <div><strong className="text-indigo-600">Reason:</strong> {appointment.reason}</div>
                  </div>

                  {/* Edit and Delete buttons */}
                  <div className="mt-4 space-x-4">
                    <button
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
                      onClick={() => handleEdit(appointment)} // Call handleEdit on button click
                    >
                      Edit
                    </button>
                    <button
                      className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {connectionStatus && <p className="mt-4 text-red-500 text-center">{connectionStatus}</p>}

      {/* Edit Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-2xl font-semibold mb-4">Edit Appointment</h3>
            <div className="mb-4">
              <label className="block font-semibold">Patient:</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                value={editingAppointment.patientId}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, patientId: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Doctor:</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                value={editingAppointment.doctorId}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, doctorId: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Date:</label>
              <input
                type="date"
                className="p-2 border rounded w-full"
                value={editingAppointment.date}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Reason:</label>
              <textarea
                className="p-2 border rounded w-full"
                rows="3"
                value={editingAppointment.reason}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, reason: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleUpdate} // Call handleUpdate on Save Changes
              >
                Save Changes
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setEditingAppointment(null)} // Close modal on Cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
