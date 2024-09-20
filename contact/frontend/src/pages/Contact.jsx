import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [img, setImg] = useState([]);
  const navigate = useNavigate();

  // Fetch contacts from the API when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/contact', { withCredentials: true });
        setContacts(response.data);
        setImg(response.data.profile);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
      }
    };

    fetchContacts();
  }, []);

  const addContact = () => {
    navigate('/add');
  };

  const editContact = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/contact/delete/${id}`, { withCredentials: true });
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Failed to delete contact');
    }
  };

  const logout = () => {
    Cookies.remove('jwt');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Contacts</h1>
          <div className="space-x-4">
            <button
              onClick={addContact}
              className="py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            >
              + Add Contact
            </button>
            <button
              onClick={logout}
              className="py-3 px-5 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transform transition hover:scale-105"
              >
                <div className="mb-4 text-center">
                  <img
                    src={`http://localhost:8080/${contact.profile}`}
                    alt={contact.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-indigo-400"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">{contact.name}</h2>
                  <p className="text-sm text-gray-500">Email: {contact.email}</p>
                  <p className="text-sm text-gray-500">Phone: {contact.phone}</p>
                </div>
                <div className="flex justify-around mt-6">
                  <button
                    onClick={() => editContact(contact._id)}
                    className="py-2 px-6 bg-yellow-400 text-white rounded-full font-semibold hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="py-2 px-6 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
