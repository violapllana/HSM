import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaNotesMedical, FaClipboardList, FaStethoscope, FaRegCalendarCheck } from 'react-icons/fa';

const data = [
  { month: 'Jan', Appointments: 5, Patients: 12 },
  { month: 'Feb', Appointments: 8, Patients: 14 },
  { month: 'Mar', Appointments: 12, Patients: 18 },
  { month: 'Apr', Appointments: 10, Patients: 16 },
  { month: 'May', Appointments: 6, Patients: 10 },
  { month: 'Jun', Appointments: 14, Patients: 20 },
];

const stats = [
  { label: 'Appointments', value: 74, icon: <FaRegCalendarCheck className="text-blue-500" size={30} /> },
  { label: 'Patients Treated', value: 122, icon: <FaStethoscope className="text-green-500" size={30} /> },
  { label: 'Reports Written', value: 38, icon: <FaClipboardList className="text-yellow-500" size={30} /> },
  { label: 'Prescriptions', value: 49, icon: <FaNotesMedical className="text-purple-500" size={30} /> },
];

const DoctorDashboard = () => {
  return (
<div className="bg-white shadow-md rounded-lg p-6 mt-4 mr-4">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Appointments" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="Patients" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoctorDashboard;
