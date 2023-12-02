import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/EmployeeList.css';
import UpdateEmployee from './UpdateEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getUserInformation = () => {
    const USER_URL = "http://localhost:3002/api/v1/emp/employees";

    axios.get(USER_URL)
      .then(res => {
        setEmployees(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const viewEmployee = (id) => {
    navigate(`/api/v1/emp/employees/${id}`);
    };
    
    const updateEmployee = (id) => {
        navigate(`/api/v1/emp/employees/update/${id}`)
    }

    const deleteEmployee = async (id) => {
    try {
        alert('Deleting an employee!');
        await axios.delete(`http://localhost:3002/api/v1/emp/employees?eid=${id}`);
        console.log('Employee deleted successfully!');
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
    };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <div>
      <Link to="/api/v1/emp/employees">
        <button
          style={{
            width: '150px',
            height: '50px',
            color: 'white',
            marginTop: '10px',
            backgroundColor: 'lightskyblue',
          }}
        >
          Add Employee
        </button>
        <Link to="/api/v1/user/login">
        <button
          style={{
            width: '150px',
            height: '50px',
            color: 'white',
            marginTop: '10px',
            backgroundColor: 'red',
            marginLeft: '15px'
          }}
        >
          Logout
        </button></Link>
      </Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => viewEmployee(employee._id)}>View</button>
                <button onClick={() => updateEmployee(employee._id)}>Update</button>
                <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
