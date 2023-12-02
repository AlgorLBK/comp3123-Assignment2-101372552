const Employee = require('../models/employeeModel')
const express = require("express")
const routes = express.Router()

routes.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
});

routes.post('/', async (req, res) => {
  
  try {
    console.log('Received a POST request to add an employee:', req.body);
    const { first_name, last_name, email, gender, salary } = req.body;
    
    if (['male', 'female', 'other'].includes(gender)) {
      const employee = new Employee({ first_name, last_name, email, gender, salary });

      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ status: false, message: 'Email already exists' });
      }
      try {
        await employee.save();
        res.status(201).json({ status: true, message: 'Employee created successfully' });
      } catch (error) {
        console.error('Error saving employee:', error);
        res.status(500).json({ status: false, message: 'An error occurred while saving the employee' });
      }
    } else {
      
      res.status(400).json({ status: false, message: 'Invalid gender value' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
});

routes.get('/:eid', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (emp == null) {
      res.status(404).json({ status: false, message: 'Employee not found' });
    } else {
      res.status(200).json(emp);
    }
  } catch (err) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
})

routes.put('/:eid', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }
    res.status(200).json({ status: true, message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
})

routes.delete('/', async (req, res) => {
  try {
    if (Employee.findById(req.query.eid) == null) {
      return res.status(404).json({ status: false, message: 'Employee does not exist.' })
    } else {
      await Employee.findByIdAndDelete(req.query.eid)
      res.status(204).json({ status: true, message: 'User successfully deleted' });
    }    
  } catch (err) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
})

module.exports = routes