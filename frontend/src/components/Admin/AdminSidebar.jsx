import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './ManageAdmins';
import DoctorPanel from './ManageDoctors';
import PatientPanel from './ManagePatients';
import ContactList from '../ContactUs/ContactList';
import HospitalSurveyChart from './AdminDashboard';
import DepartmentsPanel from '../Admin/Departments';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // default fillon me dashboard

  const handleLogout = () => {
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
            <button 
              onClick={() => setActiveTab("dashboard")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("adminpanel")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Manage Admins
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("doctorpanel")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Manage Doctors
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("patientpanel")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Manage Patients
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("contactlist")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Contacts
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab("departments")}
              className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Departments
            </button>
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

      {/* Display the active tab content */}
      <div className="ml-64 p-6">
        {activeTab === "dashboard" && (
          <div id="dashboard">
            <HospitalSurveyChart />
          </div>
        )}

        {activeTab === "adminpanel" && (
          <div id="admins">
            <AdminPanel />
          </div>
        )}

        {activeTab === "doctorpanel" && (
          <div id="doctors">
            <DoctorPanel />
          </div>
        )}

        {activeTab === "patientpanel" && (
          <div id="patients">
            <PatientPanel />
          </div>
        )}

        {activeTab === "contactlist" && (
          <div id="contacts">
            <ContactList />
          </div>
        )}

        {activeTab === "departments" && (
          <div id="departments">
            <DepartmentsPanel />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;
