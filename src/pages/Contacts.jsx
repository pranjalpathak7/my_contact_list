import React, { useState, useEffect, useMemo, useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Import context
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import AddContactForm from '../components/AddContactForm';
import ThemeToggle from '../components/ThemeToggle';
import ViewToggle from '../components/ViewToggle';
import { useNavigate } from 'react-router-dom'; // Import for logout redirect

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const { api, logout } = useContext(AuthContext); // Get the api instance and logout
  const navigate = useNavigate(); // Hook for redirecting
  
  // --- Theme/View States (from localStorage) ---
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [viewStyle, setViewStyle] = useState(() => localStorage.getItem('viewStyle') || 'grid');
  
  // --- Theme/View Effects (unchanged) ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('viewStyle', viewStyle);
  }, [viewStyle]);

  // --- DATA FETCHING (unchanged) ---
  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/contacts'); // Fetch from backend
        setContacts(res.data);
      } catch (err) {
        console.error('Error fetching contacts', err);
        if(err.response && err.response.status === 401) {
           // If token is bad, logout and redirect
           logout();
           navigate('/login');
        }
      }
      setIsLoading(false);
    };
    getContacts();
  }, [api, logout, navigate]); // Add dependencies

  // --- Event Handlers (MODIFIED) ---
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleViewStyle = () => setViewStyle((prev) => (prev === 'grid' ? 'list' : 'grid'));

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  const handleAddContact = async (newContact) => {
    try {
      const res = await api.post('/contacts', newContact); // Save to backend
      setContacts((prev) => [res.data, ...prev]); // Add new contact to top
      setIsModalOpen(false); 
    } catch (err) {
      console.error('Error adding contact', err);
    }
  };

  // --- THIS FUNCTION IS NOW FIXED ---
  const handleDeleteContact = async (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await api.delete(`/contacts/${idToDelete}`); // Delete from backend
        
        // --- THE FIX IS HERE ---
        // Filter by c._id (from MongoDB) instead of c.id
        setContacts((prev) => prev.filter((c) => c._id !== idToDelete));

      } catch (err) {
        console.error('Error deleting contact', err);
      }
    }
  };

  const handleSearch = (query) => setSearchTerm(query);
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  // --- Render Logic (unchanged) ---
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
    
    return <ContactList 
              contacts={filteredContacts} 
              onDelete={handleDeleteContact} 
              viewStyle={viewStyle} 
            />;
  };

  return (
    <> 
      <header>
        <h1>My Contact List</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main>
        <div className="list-container">
          
          <div className="list-header">
            <SearchBar onSearch={handleSearch} />
            <ViewToggle viewStyle={viewStyle} toggleViewStyle={toggleViewStyle} />
            <button 
              className="add-new-btn" 
              onClick={() => setIsModalOpen(true)}
            >
              Add New Contact
            </button>
          </div>
          
          <h2>Contacts</h2>
          {renderContent()}
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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