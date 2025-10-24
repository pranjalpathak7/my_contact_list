import React from 'react';

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
      </div>

      <button 
        className="delete-btn" 
        // --- CRUCIAL FIX: Pass contact._id (from MongoDB) ---
        onClick={() => onDelete(contact._id)}
        title="Delete contact"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          width="20px" 
          height="20px"
        >
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
      
    </div>
  );
};

export default ContactCard;