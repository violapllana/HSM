// departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controller/departmentController');

// Rrugët për të marrë listën e departamenteve dhe detajet e departamentit
router.get('/', departmentController.getDepartments); 
router.get('/:id', departmentController.getDepartmentById); 

module.exports = router;
