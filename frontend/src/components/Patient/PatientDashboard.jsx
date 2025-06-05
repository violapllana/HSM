import React from 'react';
import { FaHeart, FaSmile } from 'react-icons/fa';

const PatientDashboard = ({ setActiveTab }) => {
  const quote = "Health is not valued until sickness comes. Take care of yourself today for a better tomorrow.";

  const handleBookAppointment = () => {
    setActiveTab('AppointmentPatient');
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-500 p-8 rounded-lg shadow-xl">

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white">Welcome to Your Health Dashboard</h1>
        <p className="text-lg text-white">Your health journey starts here</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-center mb-4">
          <FaHeart className="text-red-500" size={40} />
        </div>
        <p className="text-center text-lg font-semibold text-gray-700 italic">"{quote}"</p>
        <p className="text-center text-gray-600 mt-4">Take a moment to appreciate your health and always put yourself first!</p>
      </div>


      <div className="text-center mb-6">
        <button
          onClick={handleBookAppointment}
          className="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:bg-green-600 transition"
        >
          Book an Appointment
        </button>
      </div>


      <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <FaSmile className="text-yellow-500" size={40} />
        </div>
        <p className="text-center text-lg text-gray-700">Keep a positive mindset, stay active, and be kind to your body. 😊</p>
      </div>
    </div>
  );
};

export default PatientDashboard;
