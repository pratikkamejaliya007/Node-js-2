import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Fake contact data
const fakeContacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', phone: '555-123-4567' },
];

function ContactPage() {
  const [contacts, setContacts] = useState(fakeContacts);

  const navigate=useNavigate()

  const addContact = () => {
   navigate("/add")
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contact List</h1>
          <button
            onClick={addContact}
            className="py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg transform transition hover:scale-105 focus:outline-none"
          >
            + Add Contact
          </button>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-md p-6 transition transform hover:-translate-y-2"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
                <p className="text-sm text-gray-500">Email: {contact.email}</p>
                <p className="text-sm text-gray-500">Phone: {contact.phone}</p>
              </div>
              <button className="mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
