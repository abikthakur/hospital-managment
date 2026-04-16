const express = require('express');
const { getDepartments, addDepartment, deleteDepartment } = require('../controllers/departmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getDepartments)
  .post(protect, addDepartment);

router.route('/:id')
  .delete(protect, deleteDepartment);

module.exports = router;
