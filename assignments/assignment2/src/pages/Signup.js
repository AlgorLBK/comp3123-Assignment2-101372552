import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      await axios.post('http://localhost:3002/api/v1/user/signup', {
        username,
        email,
        password
      });
        alert('successful sign up !')
      navigate('/api/v1/user/login')
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
        <Link to="/api/v1/user/login">
          <button style={{ backgroundColor: 'red' }}>Login Page</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
