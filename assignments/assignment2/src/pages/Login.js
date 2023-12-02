import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:3002/api/v1/user/login', {
        username,
        password
      }).then(response => {
          alert('Successful login !')
          navigate('/api/v1/emp/employees/list')
          setFormData({
              username: '',
              password: ''
          });
      }
      )
        
    } catch (error) {
        alert('Username or password incorrect !')
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <Link to="/">
          <button style={{ backgroundColor: 'red' }}>Sign up</button>
        </Link>
      </form>
    </div>
  );
}
