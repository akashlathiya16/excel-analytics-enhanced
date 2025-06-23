const express = require('express');    //import express
const mongoose = require('mongoose');   //import mongoose, connect and work with mongo db
const cors = require('cors');           //import cors, enable cross-origin requests
require('dotenv').config();            //import dotenv , load environment variables from .env file


const app = express();        // initialize express app

// Middleware
app.use(cors());                // allow frontend to make requests to backend
app.use(express.json());         // parse incoming JSON req  bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));   // use authRoutes for authentication
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Excel Analytics API is running!' });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))       // on success
.catch(err => console.log('MongoDB connection error:', err));       // on error
 

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large' });
  }
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 5000;       // use port from .env file or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));   // start server