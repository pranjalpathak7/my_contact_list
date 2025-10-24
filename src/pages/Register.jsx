import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); // For password confirmation
  const [error, setError] = useState(''); // To display errors to the user
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // 1. Check if passwords match
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 2. Call the register function from our context
      await register(email, password);
      
      // 3. Navigate to the main contacts page on success
      navigate('/');
    } catch (err) {
      // 4. If register function throws an error, display it
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h3>Create Your Account</h3>
        
        {/* Display error message if 'error' state is set */}
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6" // Good practice to enforce minimum length
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          minLength="6"
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;