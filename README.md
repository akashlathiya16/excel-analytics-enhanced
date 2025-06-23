# Excel Analytics MERN Stack Project

A full-stack web application for Excel file analysis with authentication, file upload, and data visualization.

## Features

- User Registration & Login with JWT authentication
- Excel/CSV file upload with validation
- Interactive charts using Chart.js
- Upload history tracking
- Custom modals and modern UI
- MongoDB database integration

## Tech Stack

**Frontend:** React.js, Chart.js, CSS3
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Authentication:** JWT, bcrypt

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/akashlathiya16/excel-analytics-project.git
cd excel-analytics-project
```

### 2. Backend Setup
```bash
cd Excel_Analytics
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Frontend Setup
```bash
cd ..
npm install
```

## Running the Application

### Start Backend (Terminal 1)
```bash
cd Excel_Analytics
node server.js
```
Backend runs on: http://localhost:5000

### Start Frontend (Terminal 2)
```bash
npm start
```
Frontend runs on: http://localhost:3000

## Usage

1. Register/Login to access dashboard
2. Upload Excel/CSV files
3. Analyze data with interactive charts
4. View upload history in sidebar
5. Track file statistics and analytics

## Project Structure

```
├── Excel_Analytics/     # Backend
│   ├── controllers/     # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Main server
├── src/                # Frontend
│   ├── components/     # React components
│   ├── contexts/       # Context providers
│   └── Dashboard.js    # Main dashboard
├── public/             # Static files
└── Testing Files/      # Sample data for testing
    ├── sample-data-ex0.csv # Original monthly sample data
    ├── sample-data-ex1.csv # Product-based sample data
    ├── sample-data-ex2.csv # Quarterly sample data
    └── sample-data-ex3.csv # Weekly sample data
```

## Testing Files

The project includes sample CSV files for testing the upload and visualization features:

- **sample-data-ex0.csv** - Monthly sales data with regions (Original)
- **sample-data-ex1.csv** - Product-based data with categories (Laptop, Mobile, Tablet)
- **sample-data-ex2.csv** - Quarterly data with managers and categories
- **sample-data-ex3.csv** - Weekly data with store locations and employees

These files can be used to test:
- File upload functionality
- Chart generation
- Data visualization
- Different data structures and formats

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/upload` - File upload
- `GET /api/upload/history` - Upload history

## Developer

**Akash Lathiya**
- GitHub: @akashlathiya16
- Email: akashlathiya16@gmail.com

## Acknowledgments

Original design inspiration from Simar555/Excel-Project 