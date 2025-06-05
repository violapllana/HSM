import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

const ContactUs = ({ onMessageAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const addMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setMessageType('');

    if (!firstName || !messageContent) {
      setResponseMessage('First Name and Message cannot be empty.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setResponseMessage('Email format is invalid.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const newMessage = { firstName, lastName, email, phoneNumber, reason, messageContent };

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setResponseMessage(data.message);
        setMessageType('success');
        onMessageAdded?.();
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setReason('');
        setMessageContent('');
      } else {
        setResponseMessage(data.error || 'There was an error sending your message.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('API error:', error);
      setResponseMessage('There was an error sending your message.');
      setMessageType('error');
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50 flex items-center justify-center py-12 mt-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Contact Us</h2>

          {responseMessage && (
            <div
              className={`text-sm mt-2 text-center ${
                messageType === 'error' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {responseMessage}
            </div>
          )}

          <form onSubmit={addMessage} className="mt-6 space-y-4">
            {/* First and Last Name in a row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Other fields */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Contact
              </label>
              <select
                id="reason"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="messageContent"
                placeholder="Enter your message"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
