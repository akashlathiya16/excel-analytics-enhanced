const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDashboard, getProfile, getAllUsers, getPlatformStats, getUploadHistory } = require('../controllers/userController');

// User dashboard
router.get('/dashboard', auth, getDashboard);

// User profile
router.get('/profile', auth, getProfile);

// User upload history
router.get('/uploads', auth, getUploadHistory);

// Admin routes
router.get('/admin/users', auth, getAllUsers);
router.get('/admin/stats', auth, getPlatformStats);

module.exports = router; 
