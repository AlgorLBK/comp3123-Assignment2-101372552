import React, { Component } from 'react';
import '../styles/AddEmployee.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      salary: '',
      gender: 'male'
    };
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleFormSubmission = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, salary, gender } = this.state;
    try {
      await axios.post('http://localhost:3002/api/v1/emp/employees', {
        first_name,
        last_name,
        email,
        salary,
        gender,
      });
      alert('Successful registration !')
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        salary: '',
        gender: 'male',
      });
    } catch (error) {
      alert('Registration failed !')
      console.error('Error submitting form:', error);
    }
  };
  
  render() {
    return (
      <div>
        <h2>Add Employee</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={this.state.first_name}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={this.state.last_name}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            name="salary"
            id="salary"
            value={this.state.salary}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={this.state.gender}
            onChange={this.handleInputChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button type='submit'>Submit</button>
          <Link to='/api/v1/emp/employees/list'><button style={{backgroundColor: 'red'}}>Employee List</button></Link>
        </form>
      </div>
    );
  }
}
