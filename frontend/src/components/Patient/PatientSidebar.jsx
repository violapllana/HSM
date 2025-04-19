// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DepartmentsList from "../Admin/DepartmentsList";
// import PatientDashboard from "../Patient/PatientDashboard";  // Adjusted the import paths

// const PatientSidebar = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard"); // default starts with dashboard

//   const handleLogout = () => {
//     navigate('/logout');
//   };

//   return (
//     <>
//       <header className="bg-blue-600 text-white shadow-md">
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">HSM - Patient</h1>
//           <nav className="space-x-6">
//             <button onClick={() => setShowModal(true)} className="text-white-500 hover:text-red-700">
//               Logout
//             </button>
//           </nav>
//         </div>
//       </header>

//       <div className="bg-gray-100 border-r-2 border-gray-300 p-4 h-screen fixed w-64 shadow-md">
//         <ul className="space-y-2">
//           <li>
//             <button
//               onClick={() => setActiveTab("dashboard")}
//               className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
//             >
//               Dashboard
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("departmentslist")}
//               className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
//             >
//               Departments
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Logout Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold text-center">Are you sure you want to logout?</h2>
//             <div className="mt-4 flex justify-around">
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Display the active tab content */}
//       <div className="ml-64 p-6">
//         {activeTab === "dashboard" && (
//           <div id="dashboard">
//             <PatientDashboard /> {/* Displaying the PatientDashboard component here */}
//           </div>
//         )}

//         {activeTab === "departmentslist" && (
//           <div id="departments">
//             <DepartmentsList />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PatientSidebar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDashboard from '../Patient/PatientDashboard';
import DepartmentsList from '../Department/DepartmentsList'; 
import PatientViewReports from '../Report/PatientViewReport'; 
// import AppointmentForm from '../Admin/AppointmentForm';

const PatientSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">HSM - Patient</h1>
          <nav className="space-x-6">
            <button onClick={() => setShowModal(true)} className="text-white hover:text-red-300">
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      <div className="bg-gray-100 border-r-2 border-gray-300 p-4 h-screen fixed w-64 shadow-md">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="block w-full text-left p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("departmentslist")}
              className="block w-full text-left p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              Departments
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("viewreports")}
              className="block w-full text-left p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              My Reports
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => setActiveTab("AppointmentForm")}
              className="block w-full text-left p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded"
            >
              My AppointmentForm
            </button>
          </li> */}
          
          {/* Mund të shtosh më shumë seksione si "Appointments", "Prescriptions" etj. nëse ke komponentë për to */}
        </ul>
      </div>

      {/* Modal për logout */}
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

      {/* Përmbajtja dinamike në të djathtë të sidebar-it */}
      <div className="ml-64 p-6">
        {activeTab === "dashboard" && (
          <div id="dashboard">
            <PatientDashboard />
          </div>
        )}

        {activeTab === "departmentslist" && (
          <div id="departmentslist">
            <DepartmentsList />
          </div>
        )}
        
        {/* {activeTab === "AppointmentForm" && (
          <div id="AppointmentForm">
            <AppointmentForm />
          </div>
        )} */}
        
           {activeTab === "viewreports" && (
          <div id="departmentslist">
            < PatientViewReports/>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientSidebar;
