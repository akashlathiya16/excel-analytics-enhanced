import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Charts, { ChartTypeSelector } from './Charts';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showChartModal, setShowChartModal] = useState(false);
  const [currentChartData, setCurrentChartData] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  const fetchUploadHistory = async () => {
    try {
      const response = await fetch('/api/user/uploads', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUploadHistory(data.uploads || []);
      }
    } catch (error) {
      console.error('Error fetching upload history:', error);
      // Add some sample data for demo
      setUploadHistory([
        {
          filename: 'sample-data.csv',
          uploadDate: new Date().toISOString(),
          recordCount: 12,
          fileSize: 0.3
        },
        {
          filename: 'sample-data.csv',
          uploadDate: new Date().toISOString(),
          recordCount: 12,
          fileSize: 0.3
        }
      ]);
    }
  };

  const handleAnalyze = async (filename) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll generate sample chart data
      // In a real app, this would fetch the actual file data from the backend
      const sampleChartData = {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
        datasets: [{
          label: 'Sales Amount',
          data: [1200, 1900, 800, 1500, 2000, 1100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB', 
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }],
        title: `Analysis of ${filename}`
      };

      setCurrentChartData(sampleChartData);
      setShowChartModal(true);
      
    } catch (error) {
      console.error('Error analyzing file:', error);
      alert('Error analyzing file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (filename) => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      // In a real app, this would call the delete API
      console.log('Deleting file:', filename);
      // Refresh the upload history
      fetchUploadHistory();
    }
  };

  const handleFileUpload = () => {
    // Simple file upload functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('File selected:', file.name);
        // In a real app, this would upload the file to the backend
        alert(`File "${file.name}" would be uploaded and processed.`);
        // Refresh the upload history after upload
        setTimeout(() => {
          fetchUploadHistory();
        }, 1000);
      }
    };
    input.click();
  };

  const closeModal = () => {
    setShowChartModal(false);
    setCurrentChartData(null);
  };

  return (
    <>
      {/* Header */}
      <header className="header-section">
        <div className="logo-section">
          <span className="logo-icon">📊</span>
          <h1>Excel Analytics</h1>
        </div>
        <nav className="nav-section">
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">Upload</a>
          <span className="user-welcome">Welcome back, {user?.name || 'akash'}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </nav>
      </header>

      {/* Main Dashboard */}
      <div className="dashboard">
        {/* Upload Section */}
        <section className="upload-section">
          <div className="upload-content">
            <div className="upload-icon">📁</div>
            <h2>Upload Excel File</h2>
            <p>Import new data for analysis</p>
            <button className="btn btn-success" onClick={handleFileUpload}>
              Choose File
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Charts created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{uploadHistory.length}</div>
            <div className="stat-label">Files uploaded</div>
          </div>
          <div className="upload-new-section">
            <button className="btn btn-success" onClick={handleFileUpload}>
              + Upload New
            </button>
          </div>
        </section>

        {/* Recent Files Section */}
        <section className="recent-files">
          <h3>Recent Files</h3>
          <div className="files-table-container">
            <table className="files-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Date Uploaded</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.length > 0 ? (
                  uploadHistory.map((file, index) => (
                    <tr key={index}>
                      <td className="file-name-cell">{file.filename}</td>
                      <td className="file-date-cell">
                        {new Date(file.uploadDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="file-size-cell">{file.fileSize} KB</td>
                      <td className="file-actions-cell">
                        <button 
                          className="action-btn analyze-btn"
                          onClick={() => handleAnalyze(file.filename)}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Analyze'}
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(file.filename)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-files-message">
                      No files uploaded yet. Upload your first Excel file to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-section">
          <p>© 2025 Excel Analytics. All rights reserved.</p>
        </footer>
      </div>

      {/* Chart Modal */}
      {showChartModal && currentChartData && (
        <div className="chart-modal-overlay" onClick={closeModal}>
          <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chart-modal-header">
              <h3>{currentChartData.title}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="chart-modal-content">
              <ChartTypeSelector 
                currentType={chartType} 
                onTypeChange={setChartType} 
              />
              <div className="chart-container">
                <Charts data={currentChartData} chartType={chartType} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;