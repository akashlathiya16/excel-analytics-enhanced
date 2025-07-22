const User = require('../models/User');
const ExcelRecord = require('../models/ExcelRecord');
const mongoose = require('mongoose');

// Get user dashboard data
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user info
    const user = await User.findById(userId).select('-password');
    
    // Get user's file statistics
    const totalFiles = await ExcelRecord.countDocuments({ userId });
    const recentFiles = await ExcelRecord.find({ userId })
      .select('fileName originalName fileSize createdAt recordCount')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get total analysis count
    const analysisCount = await ExcelRecord.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $project: { analysisCount: { $size: '$analysisHistory' } } },
      { $group: { _id: null, total: { $sum: '$analysisCount' } } }
    ]);

    res.json({
      user,
      stats: {
        totalFiles,
        totalAnalysis: analysisCount[0]?.total || 0,
        recentFiles
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
};

// Get user upload history
exports.getUploadHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const uploads = await ExcelRecord.find({ userId })
      .select('fileName originalName fileSize createdAt recordCount columns')
      .sort({ createdAt: -1 });

    const formattedUploads = uploads.map(upload => ({
      filename: upload.originalName,
      uploadDate: upload.createdAt,
      recordCount: upload.recordCount,
      fileSize: upload.fileSize,
      columns: upload.columns?.length || 0
    }));

    res.json({
      uploads: formattedUploads
    });

  } catch (error) {
    console.error('Upload history error:', error);
    res.status(500).json({ error: 'Error fetching upload history' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Admin: Get platform statistics
exports.getPlatformStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const totalUsers = await User.countDocuments();
    const totalFiles = await ExcelRecord.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    const recentUploads = await ExcelRecord.find()
      .populate('userId', 'name email')
      .select('fileName originalName fileSize createdAt userId recordCount')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalUsers,
      totalFiles,
      totalAdmins,
      regularUsers: totalUsers - totalAdmins,
      recentUploads
    });

  } catch (error) {
    console.error('Platform stats error:', error);
    res.status(500).json({ error: 'Error fetching platform stats' });
  }
}; 