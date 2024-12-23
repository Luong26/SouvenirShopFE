import React, { useState } from 'react';
import styles from './LoginSignup.module.scss';
import backgroundImage from './background.jpg'; // Adjust the path to your image file
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7096/api';

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const response = await axios.get(`${API_BASE_URL}/Product`, {
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`, // Add the Authorization header
      },
    });
    console.log('Products fetched:', response.data);
    // Handle the fetched products (e.g., set state)
  } catch (err) {
    console.error("Error fetching products:", err.message);
    // Handle error (e.g., show error message to the user)
  }
};

const LoginSignup = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
  });

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ userName: '', password: '', email: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLoginMode ? `${API_BASE_URL}/Account/login` : `${API_BASE_URL}/Account/register`;
    const payload = isLoginMode
      ? { userName: formData.userName, password: formData.password }
      : { email: formData.email, userName: formData.userName, password: formData.password };

    try {
      const response = await axios.post(url, payload);
      if (isLoginMode) {
        const token = response.data.token; // Assuming the token is in the response data
        localStorage.setItem('authToken', token); // Store the token in localStorage
        console.log('Logged in with:', formData);

        // Call the onLogin function passed from App.js
        onLogin();
        fetchProducts(); // Fetch products after obtaining the token
      } else {
        console.log('Signed up with:', formData);
      }
    } catch (error) {
      console.error(isLoginMode ? 'Login failed:' : 'Signup failed:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.formWrapper}>
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className={styles.submitBtn} type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
        </form>
        <button onClick={toggleMode}>
          {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
