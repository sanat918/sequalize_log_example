import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './LoginPage.css'; // Optional, for custom styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Make the API request
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });

      // Check if the response indicates success
      if (response.data.success) {
        // Store token or any relevant data in localStorage
        localStorage.setItem('authToken', response.data.accessToken); // Adjust based on your API response structure

        // Redirect to home page
        navigate('/home');
      } else {
        // Handle login failure
        setError('Invalid email or password.');
      }
    } catch (err) {
      // Handle request error
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
