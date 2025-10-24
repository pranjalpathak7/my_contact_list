import React, { useState } from 'react';

// Accept 'onAddContact' and new 'onClose' prop
const AddContactForm = ({ onAddContact, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!name || !phone || !email) {
      alert('Please fill in all fields.');
      return;
    }
    
    onAddContact({ name, phone, email });
    // Note: App.jsx now handles closing the modal on submit,
    // so we don't strictly need onClose() here, but we'll
    // keep clearing the form.
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    // The className "add-form" is now used by the modal content
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Contact</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* New button container */}
      <div className="form-buttons">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Add Contact</button>
      </div>
    </form>
  );
};

export default AddContactForm;