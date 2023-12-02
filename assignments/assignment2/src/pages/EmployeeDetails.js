import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    getEmployeeDetails();
  }, [id]);

  return (
    <div>
      <h1>Employee Details</h1>
      <p>First Name: {employee.first_name}</p>
      <p>Last Name: {employee.last_name}</p>
      <p>Email: {employee.email}</p>
      <p>Salary: {employee.salary}</p>
      <p>Gender: {employee.gender}</p>
      <Link to='/api/v1/emp/employees/list'><button style={{backgroundColor: 'red', width: '200px'}}>Employee List</button></Link>
    </div>
  );
};

export default EmployeeDetails;
