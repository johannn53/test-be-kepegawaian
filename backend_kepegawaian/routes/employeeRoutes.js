const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Main endpoints
router.get('/', employeeController.getAllEmployees); // GET ALL EMPLOYEE
router.get('/:id', employeeController.getOneEmployee); // GET EMPLOYEE BY ID
router.post('/', employeeController.createEmployee); // CREATE EMPLOYEE
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.get('/report/data', employeeController.getEmployeeReport);

module.exports = router;
