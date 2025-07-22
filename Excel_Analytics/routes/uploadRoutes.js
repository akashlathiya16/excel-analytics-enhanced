const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadExcel, getUserFiles, getFileData } = require('../controllers/uploadController');
const { upload } = require('../controllers/uploadController');

// Upload Excel file
router.post('/upload', auth, upload.single('excelFile'), uploadExcel);

// Get user's uploaded files
router.get('/files', auth, getUserFiles);

// Get specific file data
router.get('/files/:fileId', auth, getFileData);

module.exports = router; 