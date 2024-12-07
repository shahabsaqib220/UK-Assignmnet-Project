import React, { useState } from 'react';
import Swal from "sweetalert2";


const EmailRegistration = () => {
  const [email, setEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to handle API responses
  const handleResponse = async (response) => {
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setError('');
    } else {
      setMessage('');
      setError(data.error || 'Something went wrong');
    }
  };

  // Helper function to extract valid emails from input text
  const extractEmails = (text) => {
    const emailSet = new Set();
    // Regular expression to match email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    // Find all matching emails and store them in a Set (to avoid duplicates)
    const emails = text.match(emailRegex);
    if (emails) {
      emails.forEach((email) => emailSet.add(email.trim().toLowerCase()));
    }
    return Array.from(emailSet);
  };

  // Register a single email


  // Register bulk emails
  const handleBulkRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailsArray = extractEmails(bulkEmails);

    if (emailsArray.length === 0) {
      setError('No valid emails found in the input');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://uk-assignmnet-project.vercel.app/api/emails/registerBulkEmails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: emailsArray })
      });
      await handleResponse(response);
    } catch (err) {
      setError('Failed to register bulk emails');
    } finally {
      setIsLoading(false);
      setBulkEmails('');
    }
  };

  return (
    <>
  
  <h2 className="text-3xl font-extrabold text-gray-800 mb-5 font-moseoSans uppercase tracking-wide">
            Register Student Emails
          </h2>   

          {message &&  <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"></span>{message}
</div>} 

{error && <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <span class="font-medium"></span>{error}
</div> }

         







  

      {/* Single Email Registration Form */}


      {/* Bulk Email Registration Form */}
      <form onSubmit={handleBulkRegistration}>
        <div className="mb-4">
          
          <textarea
            id="bulkEmails"
            value={bulkEmails}
            onChange={(e) => setBulkEmails(e.target.value)}
            placeholder="Paste emails here (comma, space, or line-separated)"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 font-moseoSans uppercase tracking-wide text-white font-semibold rounded-md ${
            isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register Bulk Emails'}
        </button>
      </form>
      </>
  
  );

};

export default EmailRegistration;
