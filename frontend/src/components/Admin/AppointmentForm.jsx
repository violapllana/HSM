import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Importimi i Link nga react-router-dom

const AppointmentForm = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');

  const apiUrlDepartment = 'http://localhost:5000/api/department';
  const apiUrlDoctor = 'http://localhost:5000/api/doctor';
  const apiUrlPatient = 'http://localhost:5000/api/patient';
  const apiUrlAppointments = 'http://localhost:5000/api/appointments';

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

  const fetchPatients = async () => {
    try {
      const response = await axios.get(apiUrlPatient);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDoctors();
    fetchPatients();
  }, []);

  const handleConnect = async () => {
    if (!selectedPatient || !selectedDepartment || !selectedDoctor || !appointmentDate || !appointmentReason) {
      setConnectionStatus('Please fill all the fields before scheduling the appointment.');
      return;
    }

    const appointmentDateOnly = appointmentDate;

    try {
      const response = await axios.post(apiUrlAppointments, {
        patientId: selectedPatient,
        doctorId: selectedDoctor,
        departmentId: selectedDepartment,
        date: appointmentDateOnly,
        reason: appointmentReason,
      });
      setConnectionStatus(response.data.message || 'Appointment successfully created.');
    } catch (error) {
      setConnectionStatus('Error creating appointment.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Schedule Appointment</h2>

      {/* Department, Doctor, and Patient Selection */}
      <div className="mt-6">
        <div className="mb-4">
          <label htmlFor="department" className="block font-semibold">Choose a Department:</label>
          <select
            id="department"
            className="p-2 border rounded"
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="doctor" className="block font-semibold">Choose a Doctor:</label>
          <select
            id="doctor"
            className="p-2 border rounded"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.username}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="patient" className="block font-semibold">Choose a Patient:</label>
          <select
            id="patient"
            className="p-2 border rounded"
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.username}</option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block font-semibold">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            className="p-2 border rounded"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

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
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Schedule Appointment
        </button>

        {connectionStatus && (
          <p className="mt-4 text-red-500">{connectionStatus}</p>
        )}

        {/* Link to go to appointment list */}
        <div className="mt-4">
  <Link
    to="/AppointmentList"
    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg transform transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    View Appointment List
  </Link>
</div>

      </div>
    </div>
  );
};

export default AppointmentForm;
