import React from 'react';

const AvatarIcon = () => (
  <svg
    className="contact-avatar-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        <AvatarIcon />
      </div>

      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(contact._id)}
        title="Delete contact"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="20px"
          height="20px"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 009 2zM7 6h6v10H7V6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ContactCard;