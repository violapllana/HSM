import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/contact');
      setContacts(res.data);
    } catch (err) {
      setError('Gabim gjatë marrjes së mesazheve');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/contact/${deleteId}`);
      fetchContacts(); // Refresh the contact list after deletion
    } catch (error) {
      console.error('Gabim në fshirjen e mesazhit', error);
    } finally {
      setShowModal(false);
    }
  };

  const cancelDelete = () => setShowModal(false);

  return (
    
      <div className="p-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Contacts List</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Emri</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Numri i telefonit</th>
                <th className="p-3 text-left">Arsyeja</th>
                <th className="p-3 text-left">Mesazhi</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">Përpunimi i mesazheve...</td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="border-t">
                    <td className="p-3">{contact.firstName} {contact.lastName}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">{contact.phoneNumber}</td>
                    <td className="p-3">{contact.reason}</td>
                    <td className="p-3">{contact.messageContent}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Fshi
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <p>Jeni të sigurt që dëshironi të fshini këtë mesazh?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Po
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Jo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

  );
}