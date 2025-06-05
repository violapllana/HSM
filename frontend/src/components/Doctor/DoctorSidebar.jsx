import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import DoctorDashboard from "./DoctorDashboard";
import CreateReport from "../Report/CreateReport";
import DepartmentsList from "../Department/DepartmentsList";
import AppointmentDoctor from "./AppointmentDoctor";
import ConnectedList from "./ConnectedList";
import Footer from "../Footer";

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowSidebar(false); // Mbyll sidebar-in në mobile
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
              <h1 className="text-2xl font-bold">HSM - Doctor</h1>
            </div>
            <nav className="space-x-6">
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
                  <button onClick={() => handleTabChange("dashboard")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("departments")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                    Departments
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("connected")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                    Connected List
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("appointments")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                    Appointments
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange("createreport")} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                    Create Report
                  </button>
                </li>
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "dashboard" && <DoctorDashboard />}
            {activeTab === "departments" && <DepartmentsList />}
  {activeTab === "connected" && <ConnectedList setActiveTab={setActiveTab} />}
  {activeTab === "appointments" && <AppointmentDoctor  />}
            {activeTab === "createreport" && <CreateReport />}
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

export default DoctorSidebar;
