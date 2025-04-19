import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentPatient = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');
  const [patientAppointments, setPatientAppointments] = useState([]);

  const apiUrlDepartment = 'http://localhost:5000/api/department';
  const apiUrlDoctor = 'http://localhost:5000/api/doctor';
  const apiUrlAppointments = 'http://localhost:5000/api/appointments';

  const patientId = localStorage.getItem("patientId");

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrlDepartment);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
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

  const fetchPatientAppointments = async () => {
    try {
      const response = await axios.get(apiUrlAppointments);
      const filteredAppointments = response.data.filter(app => app.patientId.toString() === patientId);
      setPatientAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDoctors();
    if (patientId) fetchPatientAppointments();
  }, [patientId]);

  const handleConnect = async () => {
    if (!patientId || !selectedDepartment || !selectedDoctor || !appointmentDate || !appointmentReason) {
      setConnectionStatus('Please fill all the fields before scheduling the appointment.');
      return;
    }

    try {
      const response = await axios.post(apiUrlAppointments, {
        patientId: patientId,
        doctorId: selectedDoctor,
        departmentId: selectedDepartment,
        date: appointmentDate,
        reason: appointmentReason,
      });
      setConnectionStatus(response.data.message || 'Appointment successfully created.');

      // Clear form and refresh appointments
      setSelectedDepartment('');
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentReason('');
      fetchPatientAppointments(); // Refresh the appointment list
    } catch (error) {
      setConnectionStatus('Error creating appointment.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Schedule Your Appointment</h2>

      {!patientId ? (
        <p className="text-red-500 font-medium">You must be logged in as a patient to schedule an appointment.</p>
      ) : (
        <>
          <div className="mt-6">
            {/* Department Selection */}
            <div className="mb-4">
              <label htmlFor="department" className="block font-semibold">Choose a Department:</label>
              <select
                id="department"
                className="p-2 border rounded w-full"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4">
              <label htmlFor="doctor" className="block font-semibold">Choose a Doctor:</label>
              <select
                id="doctor"
                className="p-2 border rounded w-full"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.username}</option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="mb-4">
              <label htmlFor="appointmentDate" className="block font-semibold">Appointment Date:</label>
              <input
                type="date"
                id="appointmentDate"
                className="p-2 border rounded w-full"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            {/* Appointment Reason */}
            <div className="mb-4">
              <label htmlFor="appointmentReason" className="block font-semibold">Reason for Appointment:</label>
              <textarea
                id="appointmentReason"
                className="p-2 border rounded w-full"
                rows="4"
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
              />
            </div>

            <button
              onClick={handleConnect}
              className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              Schedule Appointment
            </button>

            {connectionStatus && (
              <p className="mt-4 text-red-500">{connectionStatus}</p>
            )}
          </div>

          {/* Show list of patient appointments */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Your Appointments</h3>
            {patientAppointments.length === 0 ? (
              <p>No appointments scheduled yet.</p>
            ) : (
              <ul className="space-y-4">
                {patientAppointments.map((appt) => {
                  const doctor = doctors.find(d => d.id === appt.doctorId);
                  const department = departments.find(dep => dep.id === appt.departmentId);

                  return (
                    <li key={appt.id} className="border p-4 rounded-md shadow">
                      <p><strong>Date:</strong> {appt.date}</p>
                      <p><strong>Doctor:</strong> {doctor ? doctor.username : 'N/A'}</p>
                      <p><strong>Department:</strong> {department ? department.name : 'N/A'}</p>
                      <p><strong>Reason:</strong> {appt.reason}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentPatient;
