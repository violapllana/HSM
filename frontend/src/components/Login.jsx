import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Updated import

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the POST request with credentials included (for cookies)
      const response = await axios.post('http://localhost:5000/api/users/login', formData, { withCredentials: true });

      // Debugging the response data
      console.log('Login Response:', response);

      // If login is successful, show success message and redirect to dashboard
      setMessage(response.data.message || 'Kyçja u krye me sukses!');
      
      // Storing the token in localStorage (optional but good practice)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Redirecting to the dashboard
      navigate('/dashboard'); // Redirect to the dashboard or any other protected page
    } catch (error) {
      // Handling errors and showing a meaningful message
      console.error('Login error:', error.response || error);
      setMessage(error.response?.data?.message || 'Gabim gjatë kyçjes.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Kyçja</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Kyçja
          </button>
        </form>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login; 