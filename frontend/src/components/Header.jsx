import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">HSM</h1>
        <nav className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-white-500 font-bold' : 'hover:text-yellow-500'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive ? 'text-white-500 font-bold' : 'hover:text-yellow-500'
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'text-white-500 font-bold' : 'hover:text-yellow-500'
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? 'text-white-500 font-bold' : 'hover:text-yellow-500'
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
