const express = require('express');
const { registerAdmin, authUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authUser);
router.get('/me', protect, getUserProfile);

module.exports = router;
