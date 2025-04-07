// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; // ose '../components/Footer' në varësi ku ndodhet


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = data.user?.role;

        if (!userRole) {
          setErrorMessage('User role not found!');
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', userRole);

        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'doctor') {
          navigate('/doctor');
        } else if (userRole === 'patient') {
          navigate('/patient');
        } else {
          setErrorMessage('Unknown role!');
        }

      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>

          {errorMessage && <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>}

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember me?</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log in
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot your password?</a>
          </div>

          <div className="mt-2 text-center">
            <a href="/register" className="text-sm text-cyan-600 hover:text-cyan-800">Register as a new user</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;