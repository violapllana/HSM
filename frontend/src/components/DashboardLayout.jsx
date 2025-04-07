import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AdminSidebar from './Admin/AdminSidebar';
import DoctorSidebar from './Doctor/DoctorSidebar';
import PatientSidebar from './Patient/PatientSidebar';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); 


  if (!userRole) {
    navigate('/login');
    return null;
  }

  return (
    <>
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">HSM</h1>
        <nav className="space-x-6">
          <Link to="/logout" className="hover:underline">Logout</Link>
        </nav>
      </div>
    </header>
  
    <div className="flex">

      <div className="w-64">
        {userRole === 'admin' && <AdminSidebar />}
        {userRole === 'doctor' && <DoctorSidebar />}
        {userRole === 'patient' && <PatientSidebar />}
      </div>


      <div className="flex-1 p-6">
        {children} 
      </div>
    </div>
       {/* <footer className="border-t border-gray-700 bg-gray-800 text-gray-300 py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            &copy; 2024 - HospitalManagement -{" "}
            <Link to="/privacy" className="text-blue-400 hover:underline">
              Privacy
            </Link>
          </div>
        </footer> */}
    </>
  );
};

export default DashboardLayout;
