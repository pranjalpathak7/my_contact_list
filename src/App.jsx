import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register'; // Make sure you created this file
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Private Route: Only accessible when logged in */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Contacts />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;