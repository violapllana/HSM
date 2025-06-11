import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const apiUrl = 'http://localhost:5000/api/doctor';

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.id) {
      fetchDoctor(loggedInUser.id);
    }
  }, []);

  const fetchDoctor = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      setDoctor(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    }
  };

  const validateForm = () => {
    if (!username || !email) {
      setErrorMessage('Username and Email are required.');
      return false;
    }

    if (password) {
      const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          'Password must start with an uppercase letter, be at least 8 characters, include a number and a special character.'
        );
        return false;
      }
    }

    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) return;

    try {
      const updatedDoctor = { username, email };
      if (password) updatedDoctor.password = password;

      await axios.put(`${apiUrl}/${doctor.id}`, updatedDoctor);
      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile.');
    }
  };

  if (!doctor) return <p className="text-center mt-10">Loading your profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
