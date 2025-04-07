// src/components/DashboardLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DoctorSidebar from './DoctorSidebar';
import PatientSidebar from './PatientSidebar';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');  // Get the user's role from localStorage or context

  // If role is not found, redirect to login page
  if (!userRole) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex">
      {/* Conditionally render sidebar based on the role */}
      <div className="w-64">
        {userRole === 'admin' && <AdminSidebar />}
        {userRole === 'doctor' && <DoctorSidebar />}
        {userRole === 'patient' && <PatientSidebar />}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        {children}  {/* This will render the child components inside the dashboard */}
      </div>
    </div>
  );
};

export default DashboardLayout;
