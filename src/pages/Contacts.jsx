import React, { useState, useEffect, useMemo, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import AddContactForm from '../components/AddContactForm';
import ThemeToggle from '../components/ThemeToggle';
import ViewToggle from '../components/ViewToggle';
import { useNavigate } from 'react-router-dom';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { api, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );
  const [viewStyle, setViewStyle] = useState(
    () => localStorage.getItem('viewStyle') || 'grid'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('viewStyle', viewStyle);
  }, [viewStyle]);

  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error('Error fetching contacts', err);
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/login');
        }
      }
      setIsLoading(false);
    };
    getContacts();
  }, [api, logout, navigate]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleViewStyle = () =>
    setViewStyle((prev) => (prev === 'grid' ? 'list' : 'grid'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddContact = async (newContact) => {
    try {
      const res = await api.post('/contacts', newContact);
      setContacts((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding contact', err);
    }
  };

  const handleDeleteContact = async (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.delete(`/contacts/${idToDelete}`);
        setContacts((prev) => prev.filter((c) => c._id !== idToDelete));
      } catch (err) {
        console.error('Error deleting contact', err);
      }
    }
  };

  const handleSearch = (query) => setSearchTerm(query);

  const filteredContacts = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (!lowerSearchTerm) {
      return contacts;
    }

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerSearchTerm) ||
        (contact.phone && contact.phone.includes(searchTerm))
    );
  }, [contacts, searchTerm]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Loading contacts...</div>;
    }
    if (filteredContacts.length === 0 && searchTerm) {
      return <div className="no-results">No contacts found for "{searchTerm}"</div>;
    }
    if (filteredContacts.length === 0 && !searchTerm) {
      return <div className="no-results">No contacts yet. Add one!</div>;
    }

    return (
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDeleteContact}
        viewStyle={viewStyle}
      />
    );
  };

  return (
    <>
      <header>
        <h1>My Contact List</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main>
        <div className="list-container">
          <div className="list-header">
            {/* SearchBar component is already updated */}
            <SearchBar onSearch={handleSearch} />

            {/* New wrapper for action buttons */}
            <div className="list-header-actions">
              <ViewToggle
                viewStyle={viewStyle}
                toggleViewStyle={toggleViewStyle}
              />
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                {/* Plus Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="18px"
                  height="18px"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add Contact
              </button>
            </div>
          </div>

          <h2>Contacts</h2>
          {renderContent()}
        </div>
      </main>

      {/* --- MODAL UPDATED --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* New Modal Header */}
            <div className="modal-header">
              <h3>Add New Contact</h3>
              <button
                className="btn-icon modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title="Close"
              >
                {/* Close Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="20px"
                  height="20px"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            {/* Pass new `btn` classes to the form */}
            <AddContactForm
              onAddContact={handleAddContact}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;