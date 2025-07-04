import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminPanel = () => {
  const [adminId, setAdminId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
const [sortOrder, setSortOrder] = useState('default');


  const apiUrl = 'http://localhost:5000/api/admin';

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(apiUrl);
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const validateForm = () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return false;
    }

    const passwordRegex = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must start with an uppercase letter, contain at least 8 characters, a number, and a special character.');
      return false;
    }

    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newAdmin = { username, email, password };
      await axios.post(apiUrl, newAdmin);
      fetchAdmins();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
    
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword('');
      setCurrentAdminId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching admin for edit:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedAdmin = { username, email, password };
      await axios.put(`${apiUrl}/${currentAdminId}`, updatedAdmin);
      fetchAdmins();
      setIsEditMode(false);
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${adminToDelete}`);
      fetchAdmins();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setCurrentAdminId(null);
    setErrorMessage('');
  };
const filteredAdmins = admins
  .filter((admin) =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'a-z-username') {
      return a.username.localeCompare(b.username);
    } else if (sortOrder === 'z-a-username') {
      return b.username.localeCompare(a.username);
    } else if (sortOrder === 'a-z-email') {
      return a.email.localeCompare(b.email);
    } else if (sortOrder === 'z-a-email') {
      return b.email.localeCompare(a.email);
    } else if (sortOrder === 'newest') {
      return b.id - a.id;
    } else if (sortOrder === 'oldest') {
      return a.id - b.id;
    }
    return 0; // default
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Admin List
        <button
          onClick={() => {
            setIsEditMode(false);
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Admin
        </button>
      </h2>
      <div className="flex flex-wrap gap-4 mb-4">
  <input
    type="text"
    placeholder="Search by username or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-2 border border-gray-300 rounded-md flex-1"
  />
  
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="p-2 border border-gray-300 rounded-md"
  >
    <option value="default">Default</option>
    <option value="a-z-username">A-Z (Username)</option>
    <option value="z-a-username">Z-A (Username)</option>
    <option value="a-z-email">A-Z (Email)</option>
    <option value="z-a-email">Z-A (Email)</option>
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
  </select>
</div>


      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
       
        <tbody className="text-sm text-gray-700">
  {filteredAdmins.map((admin) => (
    <tr key={admin.id} className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{admin.id}</td> 
      <td className="px-6 py-4">{admin.username}</td>
      <td className="px-6 py-4">{admin.email}</td>
      <td className="px-6 py-4 flex items-center space-x-2">
        <button
          onClick={() => handleEdit(admin.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setAdminToDelete(admin.id);
            setShowDeleteModal(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this admin?</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Yes, Delete Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Update Admin' : 'Create New Admin'}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowFormModal(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
