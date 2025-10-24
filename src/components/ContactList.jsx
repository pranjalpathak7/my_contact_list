import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onDelete, viewStyle }) => {
  return (
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