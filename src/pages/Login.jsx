import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/'); // Redirect to contacts page on successful login
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h3>Login</h3>
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
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      
      {/* Dummy Credentials Section */}
      <div className="dummy-credentials">
        <div className="dummy-credentials-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20px"
            height="20px"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Test Credentials</span>
        </div>
        <p className="dummy-credentials-text">
          Either create an account or use the following dummy credentials for testing:
        </p>
        <div className="credentials-box">
          <div className="credential-item">
            <span className="credential-label">Email:</span>
            <span 
              className="credential-value clickable" 
              onClick={() => navigator.clipboard.writeText('pranjalpathak876@gmail.com')}
              title="Click to copy"
            >
              tria@gmail.com
            </span>
          </div>
          <div className="credential-item">
            <span className="credential-label">Password:</span>
            <span 
              className="credential-value clickable" 
              onClick={() => navigator.clipboard.writeText('123456')}
              title="Click to copy"
            >
              123456
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
