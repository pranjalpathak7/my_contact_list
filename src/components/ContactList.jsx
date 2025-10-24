import React from 'react';
import ContactCard from './ContactCard';

// --- MODIFIED: Accept 'viewStyle' prop ---
const ContactList = ({ contacts, onDelete, viewStyle }) => {
  return (
    // --- MODIFIED: Add dynamic class name ---
    <div className={`contact-list ${viewStyle}-view`}>
      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ContactList;