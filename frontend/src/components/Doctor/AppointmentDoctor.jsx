import React, { useEffect, useState } from "react";
import axios from "axios";

function AppointmentDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const doctorId = localStorage.getItem("doctorId");

  const filteredAppointments = doctorId
    ? appointments.filter((appointment) => appointment.doctorId.toString() === doctorId)
    : [];

  if (loading) {
    return (
      <p className="text-center text-lg text-red-500">Loading data, please wait...</p>
    );
  }

  if (!doctorId) {
    return (
      <p className="text-center text-lg text-red-500">
        You must be logged in as a doctor to view appointments.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Patient Name</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Reason</th>
              <th className="py-3 px-6 text-left">Appointment ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    {appointment.patient?.username || 'Unknown'}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {appointment.department?.name || 'Unknown'}
                  </td>
                  <td className="py-3 px-6 text-left">{appointment.date}</td>
                  <td className="py-3 px-6 text-left">{appointment.reason}</td>
                  <td className="py-3 px-6 text-left">{appointment.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No appointments found for you.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentDoctor;
