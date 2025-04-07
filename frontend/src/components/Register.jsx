// import { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'patient' // Default role
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', formData);
//       setMessage(response.data.message || 'Regjistrimi u krye me sukses!');
//     } catch (error) {
//       // Log the error for debugging
//       console.error('Registration error:', error.response || error);
//       setMessage(error.response?.data?.error || 'Gabim gjatë regjistrimit.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Regjistrohu</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"  
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           {/* The select for role is removed, user is always registered as 'patient' */}
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
//             Regjistrohu
//           </button>
//         </form>
//         {message && <p className="text-center mt-4 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer'; // ose '../components/Footer' nëse ndodhet në një vend tjetër

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'patient',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message || 'Regjistrimi u krye me sukses!');
    } catch (error) {
      console.error('Registration error:', error.response || error);
      setMessage(error.response?.data?.error || 'Gabim gjatë regjistrimit.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Register</h2>

          {message && <div className="text-red-500 text-sm mt-2 text-center">{message}</div>}

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-cyan-600 hover:text-cyan-800">Already have an account?<a href="/login" className="text-blue-600 hover:text-blue-800">Log in here</a></a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
