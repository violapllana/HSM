// src/components/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-100 border-r-2 border-gray-300 p-4 h-screen fixed w-64 shadow-md">
      <ul className="space-y-2">
       
        <li>
          <Link to="/admin/account" className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
            My Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
