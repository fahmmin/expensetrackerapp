import React, { useState } from 'react';
import axios from 'axios';
import './landing.css';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? 'https://expensetrackerapp-backend.onrender.com/api/login' : 'https://expensetrackerapp-backend.onrender.com/api/register';
      const response = await axios.post(endpoint, formData);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Reload the page to reset the app state
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Welcome, {user.firstName}</h2>
          <button onClick={handleSignOut} className="submit-btn">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-switch">
          {isLogin ? (
            <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
