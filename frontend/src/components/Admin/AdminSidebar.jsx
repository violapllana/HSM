import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/logout');
  };

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">HSM</h1>
          <nav className="space-x-6">
            <button onClick={() => setShowModal(true)} className="text-white-500 hover:text-red-700">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="bg-gray-100 border-r-2 border-gray-300 p-4 h-screen fixed w-64 shadow-md">
        <ul className="space-y-2">
          <li>
            <Link to="/adminpanel" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
              Manage Admins
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
              Manage Doctors
            </Link>
          </li>
          <li>
            <Link to="/patients" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
              Manage Patients
            </Link>
          </li>
          <li>
            <Link to="/contactlist" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/departments" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
              Departments
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center">Are you sure you want to logout?</h2>
            <div className="mt-4 flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
