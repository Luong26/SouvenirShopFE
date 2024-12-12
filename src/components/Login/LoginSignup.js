import React, { useState } from 'react';
import styles from './LoginSignup.module.scss';
import backgroundImage from './background.jpg'; // Adjust the path to your image file

const LoginSignup = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    gmail: '',
    username: '',
    password: '',
  });

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ gmail: '', username: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate authentication
    console.log(isLoginMode ? 'Logging in with:' : 'Signing up with:', formData);

    // Call the onLogin function passed from App.js
    onLogin();
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }} // Apply background image dynamically
    >
      <div className={styles.formWrapper}>
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="gmail"
            placeholder="Gmail"
            value={formData.gmail}
            onChange={handleChange}
            required
          />
          {!isLoginMode && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p>
          {isLoginMode
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span className={styles.toggleLink} onClick={toggleMode}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
