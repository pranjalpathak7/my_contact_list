import React, { useState } from 'react';

// 'onClose' prop is passed from the parent (Contacts.jsx)
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

    // Clear the form
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
      
      <div className="form-buttons">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Contact
        </button>
      </div>
    </form>
  );
};

export default AddContactForm;