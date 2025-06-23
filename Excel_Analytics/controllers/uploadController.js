const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const ExcelRecord = require('../models/ExcelRecord');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xlsx', '.xls', '.csv'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files (.xlsx, .xls) and CSV files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Function to generate chart data
const generateChartData = (jsonData, columns) => {
  if (!jsonData || jsonData.length === 0) return null;

  // Find the first numeric column for values
  const numericColumn = columns.find(col => {
    const values = jsonData.map(row => row[col]).filter(val => val !== null && val !== undefined);
    return values.length > 0 && values.every(val => !isNaN(parseFloat(val)));
  });

  // Find the first text column for labels
  const labelColumn = columns.find(col => col !== numericColumn);

  if (!numericColumn || !labelColumn) {
    // If no suitable columns found, create a simple count chart
    const counts = {};
    jsonData.forEach(row => {
      const key = row[columns[0]] || 'Unknown';
      counts[key] = (counts[key] || 0) + 1;
    });

    return {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Count',
        data: Object.values(counts)
      }],
      title: `${columns[0]} Distribution`
    };
  }

  // Create chart data with numeric values
  const chartData = {
    labels: [],
    datasets: [{
      label: numericColumn,
      data: []
    }],
    title: `${labelColumn} vs ${numericColumn}`
  };

  jsonData.forEach(row => {
    const label = row[labelColumn] || 'Unknown';
    const value = parseFloat(row[numericColumn]) || 0;
    
    chartData.labels.push(label);
    chartData.datasets[0].data.push(value);
  });

  return chartData;
};

// Function to generate analytics
const generateAnalytics = (jsonData, columns) => {
  if (!jsonData || jsonData.length === 0) return null;

  // Find numeric columns
  const numericColumns = columns.filter(col => {
    const values = jsonData.map(row => row[col]).filter(val => val !== null && val !== undefined);
    return values.length > 0 && values.every(val => !isNaN(parseFloat(val)));
  });

  if (numericColumns.length === 0) {
    return {
      totalRecords: jsonData.length,
      numericColumns: 0,
      textColumns: columns.length
    };
  }

  // Calculate statistics for the first numeric column
  const primaryColumn = numericColumns[0];
  const values = jsonData.map(row => parseFloat(row[primaryColumn]) || 0);

  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  return {
    totalRecords: jsonData.length,
    numericColumns: numericColumns.length,
    textColumns: columns.length - numericColumns.length,
    primaryColumn,
    sum: sum,
    averageValue: average,
    maxValue: max,
    minValue: min,
    range: max - min
  };
};

// Upload and parse Excel file
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Processing file:', req.file.originalname);

    // Read and parse Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (!jsonData || jsonData.length === 0) {
      return res.status(400).json({ error: 'No data found in the Excel file' });
    }

    // Extract column headers
    const columns = Object.keys(jsonData[0] || {});

    // Generate chart data and analytics
    const chartData = generateChartData(jsonData, columns);
    const analytics = generateAnalytics(jsonData, columns);

    // Save to database
    const excelRecord = new ExcelRecord({
      userId: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      data: jsonData,
      columns: columns,
      recordCount: jsonData.length
    });

    await excelRecord.save();

    console.log('File processed successfully:', {
      records: jsonData.length,
      columns: columns.length
    });

    res.json({
      message: 'File uploaded and parsed successfully',
      fileId: excelRecord._id,
      columns: columns,
      rowCount: jsonData.length,
      preview: jsonData.slice(0, 5), // First 5 rows for preview
      chartData: chartData,
      analytics: analytics
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error processing file: ' + error.message });
  }
};

// Get user's uploaded files
exports.getUserFiles = async (req, res) => {
  try {
    const files = await ExcelRecord.find({ userId: req.user.id })
      .select('fileName originalName fileSize createdAt columns recordCount')
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
};

// Get specific file data
exports.getFileData = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await ExcelRecord.findOne({ 
      _id: fileId, 
      userId: req.user.id 
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Generate fresh chart data and analytics
    const chartData = generateChartData(file.data, file.columns);
    const analytics = generateAnalytics(file.data, file.columns);

    res.json({
      ...file.toObject(),
      chartData: chartData,
      analytics: analytics
    });
  } catch (error) {
    console.error('Get file data error:', error);
    res.status(500).json({ error: 'Error fetching file data' });
  }
};

module.exports = { 
  upload,
  uploadExcel: exports.uploadExcel,
  getUserFiles: exports.getUserFiles,
  getFileData: exports.getFileData
}; 