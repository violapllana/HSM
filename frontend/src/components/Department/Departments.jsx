import { useState, useEffect } from 'react';
import axios from 'axios';

const allowedDepartments = [
  { id: 1, name: 'Onkologji', description: 'Departamenti që merret me trajtimin e pacientëve me kancer, duke përdorur terapi të ndryshme si kimioterapia dhe radioterapia.' },
  { id: 2, name: 'Kirurgji', description: 'Departamenti që ofron operacione dhe ndërhyrje kirurgjikale për trajtimin e sëmundjeve dhe dëmtimeve.' },
  { id: 3, name: 'Pediatri', description: 'Departamenti që kujdeset për shëndetin e fëmijëve, nga lindja deri në moshën e adoleshencës.' },
  { id: 4, name: 'Gjinokologji', description: 'Departamenti që merret me shëndetin e grave, duke përfshirë diagnostikimin dhe trajtimin e sëmundjeve të sistemit riprodhues femëror.' },
  { id: 5, name: 'Neurologji', description: 'Departamenti që merret me çrregullimet e sistemit nervor, përfshirë trurin, palcën kurrizore dhe nervat periferal.' },
  { id: 6, name: 'Ortopedi', description: 'Departamenti që trajton sëmundjet dhe dëmtimet e kockave, kyçeve dhe muskujve, duke ofruar kirurgji dhe terapi fizike.' },
  { id: 7, name: 'Dermatologji', description: 'Departamenti që merret me diagnostikimin dhe trajtimin e sëmundjeve të lëkurës, përfshirë edhe probleme të flokëve dhe thonjve.' },
  { id: 8, name: 'Psikiatri', description: 'Departamenti që trajton çrregullimet mendore dhe emocionale, duke përdorur terapi psikologjike dhe medikamente.' },
  { id: 9, name: 'Emergjencë', description: 'Departamenti që ofron kujdes të menjëhershëm për pacientët me probleme urgjente dhe të rrezikshme për jetën.' },
  { id: 10, name: 'Radiologji', description: 'Departamenti që përdor teknologjitë e imazhit për të diagnostikuar sëmundjet dhe dëmtimet e brendshme të trupit, si RTG, ultratinguj, MRI, etj.' },
  { id: 11, name: 'Kardiologji', description: 'Departamenti që trajton sëmundjet e zemrës dhe sistemit kardiovaskular.' },
  { id: 12, name: 'Endokrinologji', description: 'Departamenti që merret me çrregullimet hormonale dhe gjëndrat endokrine.' },
  { id: 13, name: 'Gastroenterologji', description: 'Departamenti që merret me sëmundjet e traktit tretës, përfshirë stomakun, zorrët dhe mëlçinë.' },
  { id: 14, name: 'Pulmologji', description: 'Departamenti që trajton sëmundjet e mushkërive dhe sistemit respirator.' },
  { id: 15, name: 'Nefrologji', description: 'Departamenti që merret me sëmundjet e veshkave dhe sistemit urinar.' },
  { id: 16, name: 'Urologji', description: 'Departamenti që trajton sëmundjet dhe çrregullimet e sistemit urinar dhe organet riprodhuese mashkullore.' },
  { id: 17, name: 'Oftalmologji', description: 'Departamenti që merret me sëmundjet dhe trajtimin e syve.' },
  { id: 18, name: 'Otorinolaringologji (ORL)', description: 'Departamenti që trajton sëmundjet e veshit, hundës dhe fytit.' },
  { id: 19, name: 'Anesteziologji', description: 'Departamenti që merret me anestezinë dhe kujdesin perioperativ gjatë operacioneve.' },
  { id: 20, name: 'Reumatologji', description: 'Departamenti që trajton sëmundjet autoimune dhe inflamatorë të nyjeve dhe indeve lidhëse.' }
];

const DepartmentsPanel = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepName, setSelectedDepName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDepId, setCurrentDepId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [depToDelete, setDepToDelete] = useState(null);

  const apiUrl = 'http://localhost:5000/api/department';

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(apiUrl);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const resetForm = () => {
    setSelectedDepName('');
    setDescription('');
    setCurrentDepId(null);
  };


  const handleDepNameChange = (e) => {
    const name = e.target.value;
    setSelectedDepName(name);
    const dep = allowedDepartments.find(d => d.name === name);
    setDescription(dep ? dep.description : '');
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (departments.some(dep => dep.name === selectedDepName)) {
      alert('Ky departament ekziston tashmë.');
      return;
    }

    try {
      const newDep = { name: selectedDepName, description };
      await axios.post(apiUrl, newDep);
      fetchDepartments();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      setSelectedDepName(res.data.name);
      setDescription(res.data.description);
      setCurrentDepId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching department:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDep = { name: selectedDepName, description };
      await axios.put(`${apiUrl}/${currentDepId}`, updatedDep);
      fetchDepartments();
      setIsEditMode(false);
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${depToDelete}`);
      fetchDepartments();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };


  const availableDepartmentsForCreate = allowedDepartments
    .filter(ad => !departments.some(d => d.name === ad.name));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 flex justify-between">
        Departments
        <button
          onClick={() => {
            setIsEditMode(false);
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Department
        </button>
      </h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {departments.length > 0 ? (
            departments.map((dep, index) => (
              <tr key={dep.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{dep.name}</td>
                <td className="px-6 py-4">{dep.description}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(dep.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDepToDelete(dep.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No departments to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this department?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={isEditMode ? handleUpdate : handleCreate}
            className="bg-white rounded p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Department' : 'Add Department'}</h3>

            <label className="block mb-2 font-medium" htmlFor="depName">Name</label>
            <select
              id="depName"
              value={selectedDepName}
              onChange={handleDepNameChange}
              required
              disabled={isEditMode} // Nuk lejo ndryshim emri në edit (nëse dëshiron)
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="" disabled>{isEditMode ? selectedDepName : 'Select Department'}</option>
              {isEditMode ? (
                <option value={selectedDepName}>{selectedDepName}</option>
              ) : (
                availableDepartmentsForCreate.map(dep => (
                  <option key={dep.id} value={dep.name}>{dep.name}</option>
                ))
              )}
            </select>

            <label className="block mb-2 font-medium" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowFormModal(false);
                  resetForm();
                  setIsEditMode(false);
                }}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPanel;
