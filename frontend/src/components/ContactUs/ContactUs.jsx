import React, { useState } from 'react';
import Header from '../Header'; 

const ContactUs = ({ onMessageAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Success or error

  const addMessage = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields to ensure none of them are empty
    if (!firstName || !messageContent) {
      setResponseMessage('First Name and Message cannot be empty!');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setResponseMessage('Email is not in the correct format!');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const newMessage = { firstName, lastName, email, phoneNumber, reason, messageContent };
    console.log('Sending message:', newMessage);

    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message saved:', data);

        if (data.message) {
          setResponseMessage(data.message);
          setMessageType('success');
          if (onMessageAdded) onMessageAdded();
        } else {
          setResponseMessage('There was an error sending the message.');
          setMessageType('error');
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setReason('');
        setMessageContent('');
        setLoading(false);
      })
      .catch((error) => {
        console.error('API error:', error);
        setResponseMessage('There was an error sending the message.');
        setMessageType('error');
        setLoading(false);
      });
  };

  return (

    <>
      <Header />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-12">


      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Contact Us</h2>

        {responseMessage && (
          <div
            className={`text-sm mt-2 text-center ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}
          >
            {responseMessage}
          </div>
        )}

        <form onSubmit={addMessage} className="mt-6">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Contact</label>
            <select
              id="reason"
              name="reason"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">Select a reason</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700">Describe your issue</label>
            <textarea
              id="messageContent"
              name="messageContent"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
