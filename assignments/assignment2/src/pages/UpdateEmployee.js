import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddEmployee.css';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    salary: '',
    gender: 'male',
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3002/api/v1/emp/employees/${id}`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:3002/api/v1/emp/employees/${id}`, formData);
      alert("Employee updated successfully");
      navigate('/api/v1/emp/employees/list')
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last"
          value={formData.last_name}
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
        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          name="salary"
          id="salary"
          value={formData.salary}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit</button>
        <Link to='/api/v1/emp/employees/list'><button style={{backgroundColor: 'red'}}>Employee List</button></Link>
      </form>
    </div>
  );
};

export default UpdateEmployee;
