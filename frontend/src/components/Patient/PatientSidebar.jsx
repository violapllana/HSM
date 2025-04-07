// src/components/PatientSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const PatientSidebar = () => {
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
    <div className="bg-gray-50 border-r-2 border-gray-300 p-4 h-screen fixed w-64 shadow-md">
      <ul className="space-y-2">
        <li>
          <Link to="/patient/account" className="block p-2 font-bold text-gray-700 hover:bg-blue-500 hover:text-white rounded">
            My Account
          </Link>
        </li>
      </ul>
    </div>
  
        </>
        
  );
};

export default PatientSidebar;
