import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1) Basic check: fields not empty
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    // 2) Check uppercase letter
    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter.');
      return;
    }

    // 3) Check number
    if (!/[0-9]/.test(password)) {
      setErrorMessage('Password must contain at least one number.');
      return;
    }

    // 4) Check special character
    if (!/[!@#$%^&*]/.test(password)) {
      setErrorMessage('Password must contain at least one special character (e.g. !@#$%^&*).');
      return;
    }

    // 5) Check minimum length
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    // 6) Only after password passes, check email simply for “@” and “.”
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Email format is invalid.');
      return;
    }

    // 7) All checks passed → send login request
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const userRole = data.user?.role;
        if (!userRole) {
          setErrorMessage('User role not found.');
          return;
        }

        // Save token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', userRole);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect by role
        if (userRole === 'doctor') {
          localStorage.setItem('doctorId', data.user.id.toString());
          navigate('/doctorsidebar');
        } else if (userRole === 'admin') {
          navigate('/adminsidebar');
        } else if (userRole === 'patient') {
          localStorage.setItem('patientId', data.user.id.toString());
          navigate('/patientsidebar');
        } else {
          setErrorMessage('Unknown user role.');
        }
      } else {
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Log In</h2>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex items-center mb-6">
      
      
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>

          <div className="mt-2 text-center">
            <a href="/register" className="text-sm text-cyan-600 hover:text-cyan-800">
              Don’t have an account? Register
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
