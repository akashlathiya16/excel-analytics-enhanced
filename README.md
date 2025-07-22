# 📊 Excel Analytics Enhanced - Full Stack Web Application

A comprehensive **MERN Stack** web application for Excel/CSV file analysis with advanced authentication, secure file upload, interactive data visualization, and modern responsive UI.

![Project Status](https://img.shields.io/badge/Status-Production_Ready-green)
![Version](https://img.shields.io/badge/Version-2.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Key Features

### 🔐 **Authentication & Security**
- **User Registration & Login** with secure JWT authentication
- **Password encryption** using bcrypt hashing
- **Protected routes** with authentication middleware
- **Session management** with React Context API
- **Automatic token refresh** for seamless user experience

### 📁 **File Management**
- **Excel/CSV file upload** with comprehensive validation
- **File type verification** (supports .xlsx, .xls, .csv)
- **File size limits** and error handling
- **Upload history tracking** with timestamps
- **Data parsing** and structured storage in MongoDB

### 📈 **Data Visualization**
- **Interactive charts** powered by Chart.js
- **Multiple chart types**: Bar, Line, Pie, Doughnut, Polar Area
- **Dynamic chart switching** without page reload
- **Responsive charts** that adapt to screen sizes
- **Real-time data rendering** from uploaded files

### 🎨 **Modern User Interface**
- **Responsive design** compatible with all devices
- **Custom CSS animations** and transitions
- **Modern card-based layout** with glassmorphism effects
- **Dark theme elements** with professional styling
- **Intuitive navigation** with smooth user flows

---

## 🛠️ Complete Tech Stack

### **Frontend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | ^18.2.0 | Core frontend framework |
| **React Router DOM** | ^6.8.0 | Client-side routing |
| **Chart.js** | ^4.4.0 | Data visualization |
| **React-ChartJS-2** | ^5.2.0 | React wrapper for Chart.js |
| **Axios** | ^1.6.0 | HTTP requests |
| **CSS3** | Latest | Styling and animations |
| **HTML5** | Latest | Markup structure |

### **Backend Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | ^4.18.0 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | ^7.0.0 | MongoDB object modeling |
| **JWT** | ^9.0.0 | Authentication tokens |
| **bcrypt** | ^5.1.0 | Password hashing |
| **Multer** | ^1.4.0 | File upload handling |
| **CORS** | ^2.8.0 | Cross-origin requests |

### **Development Tools**
- **React Scripts** ^5.0.1 - Build and development tools
- **Git** - Version control
- **npm** - Package management
- **VS Code** - Development environment

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16.0.0 or higher)
- MongoDB (v5.0.0 or higher)
- npm or yarn package manager
- Git for version control

### **1. Clone Repository**
```bash
git clone https://github.com/akashlathiya16/excel-analytics-enhanced.git
cd excel-analytics-enhanced
```

### **2. Backend Configuration**
```bash
# Navigate to backend directory
cd Excel_Analytics

# Install dependencies
npm install

# Create environment file
touch .env
```

**Configure `.env` file:**
```env
# Database Configuration (MongoDB Atlas - Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/excel-analytics
# Or use local MongoDB
# MONGODB_URI=mongodb://localhost:27017/excel-analytics

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here_excel_analytics_2024

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### **MongoDB Atlas Setup (Recommended)**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. **Network Access**: Add your IP address OR use `0.0.0.0/0` (allow from anywhere)
4. Create database user with read/write permissions
5. Replace the MONGODB_URI with your Atlas connection string

### **⚠️ Important for Multiple PCs:**
- **Option A**: Add each PC's IP to MongoDB Atlas Network Access
- **Option B**: Use `0.0.0.0/0` in Network Access (allows any IP)
- **Always create `.env` file** in `Excel_Analytics/` folder on each new setup

### **3. Frontend Configuration**
```bash
# Navigate back to root directory
cd ..

# Install frontend dependencies
npm install
```

---

## 💻 New PC Setup (Clone & Run)

### **Quick Setup for Additional PCs:**

#### **Step 1: Clone Repository**
```bash
git clone https://github.com/akashlathiya16/excel-analytics-enhanced.git
cd excel-analytics-enhanced
```

#### **Step 2: Install Dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies  
cd Excel_Analytics
npm install
cd ..
```

#### **Step 3: Create Environment File**
```bash
# Create .env file in Excel_Analytics folder
# Copy these contents:
```
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=ExcelAnalytics
JWT_SECRET=your_super_secure_jwt_secret_key_here_excel_analytics_2024
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### **Step 4: One-Click Start**
```bash
# Windows: Double-click the batch file
start-project.bat

# Or manually start both servers
# Terminal 1: cd Excel_Analytics && npm start  
# Terminal 2: npm start
```

### **🌍 Multi-PC Database Sharing:**
- ✅ **Same Database**: All PCs connect to same MongoDB Atlas cluster
- ✅ **User Isolation**: Each user's data is separate and secure  
- ✅ **Real-time Sync**: Register on any PC, login from anywhere
- ✅ **File Storage**: Upload files from any location, access from anywhere

---

## 🖥️ Running the Application

### **Method 1: One-Click Startup (NEW! 🚀)**

**Windows Users - Double-click the batch file:**
```bash
# Simply double-click this file:
start-project.bat
```
✅ **Automatically starts both servers**  
✅ **Backend**: `http://localhost:5000`  
✅ **Frontend**: `http://localhost:3000`  

### **Method 2: Manual Development Mode**

**Terminal 1 - Backend Server:**
```bash
cd Excel_Analytics
npm start
```
✅ Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
npm start
```
✅ Frontend runs on: `http://localhost:3000`

### **Method 3: Production Build**
```bash
# Build frontend for production
npm run build

# Serve production build
npx serve -s build -l 3000
```

---

## 📋 Complete Feature Overview

### **🔑 Authentication System**
- **Real-time Authentication**: No mock data - proper user validation
- **Registration**: Create new user accounts with email validation
- **Login**: Secure authentication with JWT tokens
- **Logout**: Clean session termination
- **Protected Routes**: Automatic redirection for unauthorized access
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Middleware**: Bearer token validation for API endpoints
- **Mock Token Support**: Development-friendly authentication testing

### **📊 Dashboard Features**
- **File Upload Interface**: Drag-and-drop or click-to-upload
- **Real-time Progress**: Upload progress indicators
- **Data Preview**: Instant preview of uploaded data
- **Chart Generation**: Automatic chart creation from data
- **Chart Types**: Switch between multiple visualization types
- **Data Statistics**: Summary statistics display

### **📈 Visualization Capabilities**
- **Bar Charts**: Compare categorical data
- **Line Charts**: Show trends over time
- **Pie Charts**: Display proportional relationships
- **Doughnut Charts**: Modern alternative to pie charts
- **Polar Area Charts**: Radial data representation

### **📁 File Management**
- **Supported Formats**: .xlsx, .xls, .csv
- **File Validation**: Size, type, and content validation
- **Upload History**: Track all uploaded files with timestamps
- **Data Storage**: Structured storage in MongoDB
- **Error Handling**: Comprehensive error messages

---

## 📂 Detailed Project Structure

```
excel-analytics-enhanced/
├── 📁 Excel_Analytics/             # Backend Application
│   ├── 📁 controllers/             # Business Logic
│   │   ├── 📄 authController.js    # Authentication logic
│   │   ├── 📄 uploadController.js  # File upload handling
│   │   └── 📄 userController.js    # User management
│   ├── 📁 middleware/              # Custom Middleware
│   │   └── 📄 auth.js              # JWT authentication
│   ├── 📁 models/                  # Database Models
│   │   ├── 📄 User.js              # User schema
│   │   └── 📄 ExcelRecord.js       # File record schema
│   ├── 📁 routes/                  # API Routes
│   │   ├── 📄 authRoutes.js        # Authentication endpoints
│   │   ├── 📄 uploadRoutes.js      # File upload endpoints
│   │   └── 📄 userRoutes.js        # User management endpoints
│   ├── 📄 server.js                # Main server file
│   ├── 📄 .env                     # Environment variables
│   └── 📄 package.json             # Backend dependencies
├── 📁 src/                         # Frontend Application
│   ├── 📁 assets/                  # Organized Assets
│   │   ├── 📁 css/                 # Stylesheets
│   │   │   ├── 📄 Dashboard.css    # Dashboard styling
│   │   │   ├── 📄 Charts.css       # Chart components
│   │   │   ├── 📄 LoginPage.css    # Authentication pages
│   │   │   └── 📄 FileUpload.css   # File upload styling
│   │   └── 📁 js/                  # React Components
│   │       ├── 📄 Dashboard.js     # Main dashboard
│   │       ├── 📄 Charts.js        # Chart components
│   │       ├── 📄 LoginPage.js     # Login interface
│   │       ├── 📄 RegisterPage.js  # Registration interface
│   │       └── 📄 FileUpload.js    # File upload component
│   ├── 📁 components/              # Reusable Components
│   │   └── 📄 ProtectedRoute.js    # Route protection
│   ├── 📁 contexts/                # React Contexts
│   │   ├── 📄 AuthContext.js       # Authentication state
│   │   ├── 📄 ThemeContext.js      # Theme management
│   │   └── 📄 VersionContext.js    # Version control
│   ├── 📄 App.js                   # Main app component
│   ├── 📄 index.js                 # React entry point
│   └── 📄 App.css                  # Global styles
├── 📁 public/                      # Static Assets
├── 📁 Testing Files/               # Sample Data Files
├── 📄 start-project.bat            # One-click startup (NEW!)
├── 📄 package.json                 # Frontend dependencies
├── 📄 README.md                    # Project documentation
└── 📄 .gitignore                   # Git ignore rules
│   │   ├── 📄 uploadController.js  # File upload handling
│   │   └── 📄 userController.js    # User management
│   ├── 📁 middleware/              # Custom Middleware
│   │   └── 📄 auth.js              # JWT authentication
│   ├── 📁 models/                  # Database Models
│   │   ├── 📄 User.js              # User schema
│   │   └── 📄 ExcelRecord.js       # File record schema
│   ├── 📁 routes/                  # API Routes
│   │   ├── 📄 authRoutes.js        # Authentication endpoints
│   │   ├── 📄 uploadRoutes.js      # File upload endpoints
│   │   └── 📄 userRoutes.js        # User management endpoints
│   ├── 📄 server.js                # Main server file
│   └── 📄 package.json             # Backend dependencies
├── 📁 src/                         # Frontend Application
│   ├── 📁 assets/                  # Organized Assets
│   │   ├── 📁 css/                 # Stylesheets
│   │   │   ├── 📄 Dashboard.css    # Dashboard styling
│   │   │   ├── 📄 Charts.css       # Chart components
│   │   │   ├── 📄 LoginPage.css    # Authentication pages
│   │   │   └── 📄 FileUpload.css   # File upload styling
│   │   └── 📁 js/                  # React Components
│   │       ├── 📄 Dashboard.js     # Main dashboard
│   │       ├── 📄 Charts.js        # Chart components
│   │       ├── 📄 LoginPage.js     # Login interface
│   │       ├── 📄 RegisterPage.js  # Registration interface
│   │       └── 📄 FileUpload.js    # File upload component
│   ├── 📁 components/              # Reusable Components
│   │   └── 📄 ProtectedRoute.js    # Route protection
│   ├── 📁 contexts/                # React Contexts
│   │   └── 📄 AuthContext.js       # Authentication context
│   ├── 📄 App.js                   # Main application component
│   ├── 📄 App.css                  # Global styles
│   ├── 📄 index.js                 # Application entry point
│   └── 📄 index.css                # Base styles
├── 📁 public/                      # Static Files
│   └── 📄 index.html               # HTML template
├── 📁 Testing Files/               # Sample Data for Testing
│   ├── 📄 sample-data-ex0.csv      # Monthly sales data
│   ├── 📄 sample-data-ex1.csv      # Product categories
│   ├── 📄 sample-data-ex2.csv      # Quarterly reports
│   └── 📄 sample-data-ex3.csv      # Weekly analytics
├── 📄 package.json                 # Frontend dependencies
├── 📄 .gitignore                   # Git ignore rules
└── 📄 README.md                    # Project documentation
```

---

## 🧪 Testing Files & Sample Data

The project includes **4 comprehensive sample datasets** for testing all functionalities:

### **📊 Sample Data Files**

| File | Description | Use Case |
|------|-------------|----------|
| **sample-data-ex0.csv** | Monthly sales data with regional breakdown | Test basic chart generation |
| **sample-data-ex1.csv** | Product-based data (Laptop, Mobile, Tablet) | Test category-based visualization |
| **sample-data-ex2.csv** | Quarterly business data with managers | Test complex data relationships |
| **sample-data-ex3.csv** | Weekly store performance data | Test time-series visualization |

### **🔍 Testing Scenarios**
1. **File Upload Testing**: Use sample files to test upload functionality
2. **Chart Generation**: Verify different chart types with various datasets
3. **Data Validation**: Test with different data structures and formats
4. **Error Handling**: Test with invalid files and edge cases
5. **Performance Testing**: Upload multiple files to test system performance

---

## 🌐 API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### **File Upload Endpoints**
```http
POST /api/upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <excel_or_csv_file>
```

```http
GET /api/upload/history
Authorization: Bearer <jwt_token>
```

### **User Management Endpoints**
```http
GET /api/user/profile
Authorization: Bearer <jwt_token>
```

---

## 🎯 How to Use the Application

### **Step 1: Account Setup**
1. Open `http://localhost:3000` in your browser
2. Click "Register" to create a new account
3. Fill in your details and submit
4. Login with your credentials

### **Step 2: Upload Files**
1. Navigate to the Dashboard
2. Click "Choose File" or drag-and-drop a CSV/Excel file
3. Select from sample files in `Testing Files/` folder
4. Wait for upload and processing to complete

### **Step 3: Visualize Data**
1. View automatically generated charts
2. Switch between different chart types
3. Analyze your data with interactive visualizations
4. Check upload history in the sidebar

### **Step 4: Data Management**
1. View all uploaded files in history
2. Access detailed statistics
3. Generate reports from your data
4. Export visualizations if needed

---

## 🚀 Deployment

### **Frontend Deployment (Netlify/Vercel)**
```bash
npm run build
# Deploy 'build' folder to hosting service
```

### **Backend Deployment (Heroku/Railway)**
```bash
# Add Procfile for Heroku
echo "web: node Excel_Analytics/server.js" > Procfile

# Set environment variables on hosting platform
MONGODB_URI=<your_production_mongodb_uri>
JWT_SECRET=<your_production_jwt_secret>
PORT=5000
```

---

## 🛡️ Security Features

- **JWT Authentication** with secure token handling
- **Password Encryption** using bcrypt with salt rounds
- **Input Validation** for all user inputs
- **File Type Validation** to prevent malicious uploads
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for sensitive configuration
- **Protected Routes** with authentication middleware

---

## 🔧 Troubleshooting

### **Common Issues & Solutions**

**1. MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB service
brew services start mongodb/brew/mongodb-community
```

**2. Port Already in Use**
```bash
# Find process using port 3000 or 5000
lsof -ti:3000
kill -9 <process_id>
```

**3. Package Installation Issues**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 👨‍💻 Developer Information

**Akash Lathiya**
- 🌐 GitHub: [@akashlathiya16](https://github.com/akashlathiya16)
- 📧 Email: akashweb016@gmail.com
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/akash-lathiya-0981a8240/)
- 🌟 Portfolio: [View Projects](https://akashlathiya16.github.io)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔄 Version History

- **v2.1.0** (Latest) - Real-time authentication, MongoDB Atlas integration, one-click startup
- **v2.0.0** - Major refactor with organized file structure
- **v1.5.0** - Enhanced UI/UX and testing files
- **v1.0.0** - Initial release with core functionality

### **What's New in v2.1.0:**
- ✅ **Real Authentication**: No more mock data - proper user validation
- ✅ **MongoDB Atlas Integration**: Cloud database support
- ✅ **One-Click Startup**: `start-project.bat` for Windows users
- ✅ **Enhanced JWT Middleware**: Better token handling and validation
- ✅ **IP Whitelist Setup**: Automated MongoDB Atlas configuration
- ✅ **Development Tools**: Improved debugging and error handling

---

**⭐ If you find this project helpful, please give it a star on GitHub!** 
