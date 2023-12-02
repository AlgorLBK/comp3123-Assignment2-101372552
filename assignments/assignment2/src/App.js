import React from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import UpdateEmployee from './pages/UpdateEmployee';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/api/v1/user/login" element={<Login />} />
        <Route path="/api/v1/emp/employees/list" element={<EmployeeList />} />
        <Route path="/api/v1/emp/employees" element={<AddEmployee />} />
        <Route path="/api/v1/emp/employees/:id" element={<EmployeeDetails />} />
        <Route path="/api/v1/emp/employees/update/:id" element={<UpdateEmployee />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
