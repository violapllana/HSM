import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import AdminPanel from "./ManageAdmins";
import DoctorPanel from "./ManageDoctors";
import PatientPanel from "./ManagePatients";
import PatientAndDoctorPanel from "./ManageConnections";
import ContactList from "../ContactUs/ContactList";
import DepartmentsPanel from "../Department/Departments";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import ReportList from "../Report/ReportsList";
import ManageUsers from "./ManageUsers";
import Footer from "../Footer";
import Profile from "./Profile";
import axios from "axios";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.username) {
      setUsername(loggedInUser.username);
    }
  }, []);

  const handleLogout = async () => {
  try {
    await axios.post('http://localhost:5000/api/users/logout', {}, {
      withCredentials: true,
    });

    localStorage.removeItem('user');
    localStorage.removeItem('role');

    navigate('/login'); // ose te faqja kryesore sipas nevojës
  } catch (error) {
    console.error('Logout failed:', error);
    navigate('/');
  }
};


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowSidebar(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-white focus:outline-none"
              >
                <Menu />
              </button>
              <h1 className="text-2xl font-bold">HSM - Admin</h1>
            </div>
            <nav className="flex items-center space-x-6">
              {username && (
                <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A9 9 0 1118.879 6.196M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-white font-semibold text-lg">
                    Welcome, {username}
                  </span>
                </div>
              )}
              <button
                onClick={() => setShowModal(true)}
                className="text-white hover:text-red-300"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {showSidebar && (
            <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto fixed lg:static z-40 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out">
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleTabChange("dashboard")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Dashboard</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("manageusers")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Users</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("adminpanel")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Manage Admins</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("doctorpanel")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Manage Doctors</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("patientpanel")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Manage Patients</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("connect")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Connection</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("departments")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Departments</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("appointmentform")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Create Appointment</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("contactlist")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Contacts</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("reportlist")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">Reports</button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("profile")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">My profile</button>
                </li>
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "adminpanel" && <AdminPanel />}
            {activeTab === "doctorpanel" && <DoctorPanel />}
            {activeTab === "patientpanel" && <PatientPanel />}
            {activeTab === "connect" && <PatientAndDoctorPanel />}
            {activeTab === "departments" && <DepartmentsPanel />}
            {activeTab === "appointmentform" && <AppointmentForm />}
            {activeTab === "manageusers" && <ManageUsers />}
            {activeTab === "contactlist" && <ContactList />}
            {activeTab === "reportlist" && <ReportList />}
            {activeTab === "profile" && <Profile />}
          </main>
        </div>
      </div>

      <Footer />

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center">
              Are you sure you want to logout?
            </h2>
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
