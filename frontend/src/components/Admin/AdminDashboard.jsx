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
import { FaUserMd, FaUserNurse, FaWheelchair, FaUserPlus } from 'react-icons/fa';

const data = [
  { month: 'Jan 2025', Kosova: 20, Shqiperia: 20 },
  { month: 'Feb 2025', Kosova: 40, Shqiperia: 60 },
  { month: 'Mar 2025', Kosova: 50, Shqiperia: 45 },
  { month: 'Apr 2025', Kosova: 60, Shqiperia: 28 },
  { month: 'May 2025', Kosova: 30, Shqiperia: 70 },
  { month: 'Jun 2025', Kosova: 45, Shqiperia: 95 },
  { month: 'Jul 2025', Kosova: 65, Shqiperia: 80 },
  { month: 'Aug 2025', Kosova: 55, Shqiperia: 30 },
  { month: 'Sep 2025', Kosova: 30, Shqiperia: 35 },
];

const stats = [
  { label: 'Doctors', value: 520, icon: <FaUserMd className="text-cyan-500" size={30} /> },
  { label: 'Nurses', value: 6969, icon: <FaUserNurse className="text-red-400" size={30} /> },
  { label: 'Patients', value: 7509, icon: <FaWheelchair className="text-yellow-400" size={30} /> },
  { label: 'Pharmacists', value: 2110, icon: <FaUserPlus className="text-teal-500" size={30} /> },
];

const AdminDashboard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
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
      <h2 className="text-xl font-bold mb-4">Hospital Survey - 2025</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Kosova" stroke="#00c6ff" strokeWidth={3} />
          <Line type="monotone" dataKey="Shqiperia" stroke="#18d26e" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
