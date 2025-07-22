import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useVersion } from '../../contexts/VersionContext';
import { useNavigate } from 'react-router-dom';
import Charts, { ChartTypeSelector } from './Charts';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import Squares from '../../components/SquaresBackground';
import '../css/Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isNewVersion, toggleVersion, currentVersion } = useVersion();
  const navigate = useNavigate();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showThemeAnimation, setShowThemeAnimation] = useState(false);
  const [showUploadHistory, setShowUploadHistory] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [currentChartType, setCurrentChartType] = useState('bar');
  
  // Custom Modal States
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [showCustomConfirm, setShowCustomConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  // Initialize files from localStorage (user-specific)
  const [files, setFiles] = useState(() => {
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    const savedFiles = localStorage.getItem(`uploadedFiles_${userEmail}`);
    const defaultFiles = [
      {
        id: 1,
        fileName: 'sales-data-2024.xlsx',
        dateUploaded: 'Dec 24, 2024',
        size: '45.2 KB',
        uploadTime: new Date().toISOString()
      },
      {
        id: 2,
        fileName: 'revenue-report.csv',
        dateUploaded: 'Dec 23, 2024',
        size: '32.8 KB',
        uploadTime: new Date().toISOString()
      },
      {
        id: 3,
        fileName: 'product-analysis.xlsx',
        dateUploaded: 'Dec 22, 2024',
        size: '67.1 KB',
        uploadTime: new Date().toISOString()
      }
    ];
    return savedFiles ? JSON.parse(savedFiles) : defaultFiles;
  });

  // Initialize upload history from localStorage (user-specific)
  const [uploadHistory, setUploadHistory] = useState(() => {
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    const savedHistory = localStorage.getItem(`uploadHistory_${userEmail}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Initialize analyzed files tracking from localStorage (user-specific)
  const [analyzedFiles, setAnalyzedFiles] = useState(() => {
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    const savedAnalyzedFiles = localStorage.getItem(`analyzedFiles_${userEmail}`);
    return savedAnalyzedFiles ? JSON.parse(savedAnalyzedFiles) : [];
  });

  // Initialize charts created count from localStorage (user-specific)
  const [chartsCreated, setChartsCreated] = useState(() => {
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    const savedAnalyzedFiles = localStorage.getItem(`analyzedFiles_${userEmail}`);
    const analyzedFilesArray = savedAnalyzedFiles ? JSON.parse(savedAnalyzedFiles) : [];
    return analyzedFilesArray.length;
  });

  // Function to capitalize first letter of each word
  const capitalizeFirstLetter = (str) => {
    if (!str) return 'User';
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // Generate user initials for profile avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const username = capitalizeFirstLetter(currentUser?.name || 'User');

  // Custom Alert and Confirm Functions
  const showAlert = (message) => {
    setAlertMessage(message);
    setShowCustomAlert(true);
  };

  const showConfirm = (message, onConfirm) => {
    setConfirmMessage(message);
    setConfirmAction(() => onConfirm);
    setShowCustomConfirm(true);
  };

  const closeAlert = () => {
    setShowCustomAlert(false);
    setAlertMessage('');
  };

  const closeConfirm = () => {
    setShowCustomConfirm(false);
    setConfirmMessage('');
    setConfirmAction(null);
  };

  const handleConfirmYes = () => {
    if (confirmAction) {
      confirmAction();
    }
    closeConfirm();
  };

  const handleThemeToggle = () => {
    // Show animation only for OLD version
    if (!isNewVersion) {
      // Change theme immediately (button changes first)
      toggleTheme();
      // Then show animation
      setShowThemeAnimation(true);
      // Hide animation after complete
      setTimeout(() => {
        setShowThemeAnimation(false);
      }, 1500);
    } else {
      toggleTheme();
    }
  };

  // Save files to localStorage whenever files state changes (user-specific)
  const updateFiles = (newFiles) => {
    setFiles(newFiles);
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    localStorage.setItem(`uploadedFiles_${userEmail}`, JSON.stringify(newFiles));
  };

  // Update upload history
  const updateUploadHistory = (newHistory) => {
    setUploadHistory(newHistory);
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    localStorage.setItem(`uploadHistory_${userEmail}`, JSON.stringify(newHistory));
  };

  // Update analyzed files tracking
  const updateAnalyzedFiles = (newAnalyzedFiles) => {
    setAnalyzedFiles(newAnalyzedFiles);
    setChartsCreated(newAnalyzedFiles.length);
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    localStorage.setItem(`analyzedFiles_${userEmail}`, JSON.stringify(newAnalyzedFiles));
  };

  // Update charts created count
  const updateChartsCreated = (count) => {
    setChartsCreated(count);
    const userEmail = currentUser?.email || localStorage.getItem('userEmail') || 'default';
    localStorage.setItem(`chartsCreated_${userEmail}`, count.toString());
  };

  const handleLogout = () => {
    showConfirm('Are you sure you want to logout?', () => {
      logout();
      localStorage.removeItem('username');
      navigate('/login');
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(), // Use timestamp for unique ID
        fileName: file.name,
        dateUploaded: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadTime: new Date().toISOString() // For sorting
      };
      
      // Update files list
      const updatedFiles = [newFile, ...files];
      updateFiles(updatedFiles);
      
      // Add to upload history
      const historyEntry = {
        ...newFile,
        fullDateTime: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Uploaded Successfully',
        fileType: file.name.split('.').pop().toUpperCase()
      };
      const updatedHistory = [historyEntry, ...uploadHistory];
      updateUploadHistory(updatedHistory);
      
      showAlert(`File "${file.name}" uploaded successfully!`);
      event.target.value = '';
    }
  };

  const handleAnalyze = (fileName) => {
    // Generate sample chart data for demo with more variety
    const sampleData = {
      title: `📊 Analysis of ${fileName}`,
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: '💰 Sales Revenue',
        data: [65, 59, 80, 81, 56, 95, 88, 72],
      }, {
        label: '📦 Units Sold',
        data: [28, 48, 40, 59, 86, 77, 65, 82],
      }, {
        label: '👥 New Customers',
        data: [12, 25, 18, 35, 42, 38, 45, 55],
      }, {
        label: '🎯 Marketing ROI',
        data: [15, 22, 30, 28, 35, 40, 38, 45],
      }]
    };

    // Generate analytics insights
    const salesData = sampleData.datasets[0].data;
    const revenueData = sampleData.datasets[1].data;
    
    const totalSales = salesData.reduce((sum, val) => sum + val, 0);
    const totalRevenue = revenueData.reduce((sum, val) => sum + val, 0);
    const avgSales = (totalSales / salesData.length).toFixed(1);
    const avgRevenue = (totalRevenue / revenueData.length).toFixed(1);
    const maxSales = Math.max(...salesData);
    const minSales = Math.min(...salesData);
    const maxRevenue = Math.max(...revenueData);
    const minRevenue = Math.min(...revenueData);
    
    const bestMonth = sampleData.labels[salesData.indexOf(maxSales)];
    const worstMonth = sampleData.labels[salesData.indexOf(minSales)];
    
    const analyticsInfo = {
      fileName: fileName,
      summary: {
        totalSales,
        totalRevenue,
        avgSales,
        avgRevenue,
        bestMonth,
        worstMonth,
        maxSales,
        minSales,
        maxRevenue,
        minRevenue
      },
      insights: [
        `Best performing month: ${bestMonth} with ${maxSales} sales`,
        `Lowest performing month: ${worstMonth} with ${minSales} sales`,
        `Total revenue generated: ${totalRevenue}K`,
        `Average monthly sales: ${avgSales} units`,
        `Sales growth potential: ${((maxSales - minSales) / minSales * 100).toFixed(1)}%`,
        `Revenue efficiency: ${(totalRevenue / totalSales).toFixed(2)}K per sale`
      ],
      recommendations: [
        `Focus marketing efforts during ${worstMonth} to improve performance`,
        `Replicate ${bestMonth} strategies for consistent growth`,
        `Monitor revenue trends to maintain ${avgRevenue}K monthly average`,
        `Set target to increase minimum sales above ${minSales} units`
      ]
    };
    
    setChartData({ ...sampleData, analytics: analyticsInfo });
    setShowChartModal(true);
    
    // Add to analyzed files if not already analyzed
    if (!analyzedFiles.includes(fileName)) {
      const newAnalyzedFiles = [...analyzedFiles, fileName];
      updateAnalyzedFiles(newAnalyzedFiles);
    }
  };

  const handleDelete = (id, fileName) => {
    showConfirm(`Are you sure you want to delete ${fileName}?`, () => {
      // Find the file to get its details
      const fileToDelete = files.find(file => file.id === id);
      
      const updatedFiles = files.filter(file => file.id !== id);
      updateFiles(updatedFiles);
      
      // Add deletion record to upload history
      if (fileToDelete) {
        const deletionEntry = {
          id: Date.now(), // New unique ID for deletion record
          fileName: fileToDelete.fileName,
          fullDateTime: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: 'Deleted',
          fileType: fileToDelete.fileName.split('.').pop().toUpperCase(),
          size: fileToDelete.size
        };
        const updatedHistory = [deletionEntry, ...uploadHistory];
        updateUploadHistory(updatedHistory);
      }
      
      // Remove from analyzed files if it was analyzed
      if (analyzedFiles.includes(fileName)) {
        const newAnalyzedFiles = analyzedFiles.filter(file => file !== fileName);
        updateAnalyzedFiles(newAnalyzedFiles);
      }
      
      showAlert(`${fileName} has been deleted.`);
    });
  };

  const closeChartModal = () => {
    setShowChartModal(false);
    setChartData(null);
  };

  return (
    <div className="dashboard-container">
      {/* Squares Background for NEW Dark Theme */}
      {isNewVersion && isDarkMode && (
        <Squares 
          speed={0.5} 
          squareSize={40} 
          direction="diagonal" 
          borderColor="rgba(0, 255, 136, 0.3)" 
          hoverFillColor="#00ff88"
          className="squares-background"
        />
      )}
      
      {/* Iridescence Background for NEW Light Theme */}
      {isNewVersion && !isDarkMode && (
        <div className="iridescence-background"></div>
      )}
      
      {/* Theme Change Animation for OLD Version */}
      {showThemeAnimation && !isNewVersion && (
        <div className="theme-change-animation"></div>
      )}

      {/* Quick Actions Sidebar */}
      <div className={`quick-actions-sidebar ${showQuickActions ? 'show' : ''}`}>
        <div className="sidebar-content">
          <h3>Quick Actions</h3>
          
          <button 
            className="sidebar-btn"
            onClick={() => setShowUploadHistory(!showUploadHistory)}
          >
            📁 Upload History ({uploadHistory.length})
          </button>
          
          <button className="sidebar-btn">
            📊 Charts Created ({chartsCreated})
          </button>
          
          {/* Upload History Section */}
          {showUploadHistory && (
            <div className="upload-history-section">
              <div className="history-header">
                <h4>📋 Upload History</h4>
                <span className="history-count">{uploadHistory.length} files</span>
              </div>
              
              <div className="history-list">
                {uploadHistory.length === 0 ? (
                  <div className="no-history">
                    <p>No files uploaded yet</p>
                  </div>
                ) : (
                  uploadHistory.slice(0, 10).map((historyItem) => (
                    <div key={historyItem.id} className="history-item">
                      <div className="history-file-info">
                        <div className="file-name">{historyItem.fileName}</div>
                        <div className="file-details">
                          <span className="file-type">{historyItem.fileType}</span>
                          <span className="file-size">{historyItem.size}</span>
                        </div>
                        <div className="upload-time">{historyItem.fullDateTime}</div>
                        <div className={`status ${historyItem.status.toLowerCase().replace(' ', '-')}`}>
                          {historyItem.status}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {uploadHistory.length > 10 && (
                  <div className="view-more">
                    <button className="view-more-btn">
                      View All {uploadHistory.length} Files
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Logout Button */}
          <div className="sidebar-logout">
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showQuickActions && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setShowQuickActions(false)}
        ></div>
      )}

      {/* Chart Modal */}
      {showChartModal && (
        <div className="chart-modal-overlay" onClick={closeChartModal}>
          <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chart-modal-header">
              <h3>Chart Analysis</h3>
              <button className="close-btn" onClick={closeChartModal}>×</button>
            </div>
            <div className="chart-modal-content">
              <ChartTypeSelector 
                currentType={currentChartType} 
                onTypeChange={setCurrentChartType} 
              />
              <Charts data={chartData} chartType={currentChartType} />
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {showCustomAlert && (
        <div className="custom-modal-overlay" onClick={closeAlert}>
          <div className="custom-alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📢 Notification</h3>
            </div>
            <div className="modal-body">
              <p>{alertMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn primary" onClick={closeAlert}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal */}
      {showCustomConfirm && (
        <div className="custom-modal-overlay" onClick={closeConfirm}>
          <div className="custom-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>❓ Confirmation</h3>
            </div>
            <div className="modal-body">
              <p>{confirmMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={closeConfirm}>
                Cancel
              </button>
              <button className="modal-btn primary" onClick={handleConfirmYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
      {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="quick-action-btn user-avatar-btn"
              onClick={() => setShowQuickActions(!showQuickActions)}
              title="Quick Actions"
            >
              {getUserInitials(currentUser?.name || 'User')}
            </button>
          <h1>Excel Analytics</h1>
        </div>
          <div className="user-info">
            <button 
              className={`version-toggle ${isNewVersion ? 'new' : 'old'}`}
              onClick={toggleVersion}
              title={`Switch to ${isNewVersion ? 'Old' : 'New'} Version`}
            >
              <div className="version-toggle-text">
                {isNewVersion ? 'NEW' : 'OLD'}
              </div>
            </button>
            <ThemeToggleSwitch 
              isDarkMode={isDarkMode}
              onToggle={handleThemeToggle}
            />
            <nav className="header-nav">
              <span className="nav-link active">Dashboard</span>
            </nav>
          </div>
      </header>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome back, {username}</h2>
          <p>Here's an overview of your Excel analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card upload-card">
            <div className="card-icon">📤</div>
            <div className="card-content">
              <h3>Upload Excel File</h3>
            <p>Import new data for analysis</p>
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleFileUpload}
                accept=".xlsx,.xls,.csv"
              />
              <label htmlFor="file-upload" className="upload-btn">
              Choose File
              </label>
            </div>
          </div>

          <div className="stat-card charts-card">
            <div className="stat-number">{chartsCreated}</div>
            <div className="stat-label">Charts created</div>
          </div>

          <div className="stat-card files-card">
            <div className="stat-number">{files.length}</div>
            <div className="stat-label">Files uploaded</div>
          </div>
        </div>

        {/* Recent Files Section */}
        <div className="recent-files-section">
          <div className="section-header">
            <h3>Recent Files</h3>
            <label htmlFor="file-upload-new" className="upload-new-btn">
              + Upload New
            </label>
            <input
              type="file"
              id="file-upload-new"
              className="file-input"
              onChange={handleFileUpload}
              accept=".xlsx,.xls,.csv"
            />
          </div>

          <div className="files-table-container">
            {files.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h4>No files uploaded yet</h4>
                <p>Upload your first Excel file to get started with analytics</p>
                <label htmlFor="file-upload" className="upload-btn-empty">
                  Upload File
                </label>
              </div>
            ) : (
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
                  {files.map(file => (
                    <tr key={file.id}>
                      <td>{file.fileName}</td>
                      <td>{file.dateUploaded}</td>
                      <td>{file.size}</td>
                      <td>
                        <button 
                          onClick={() => handleAnalyze(file.fileName)}
                          className="analyze-btn"
                        >
                          Analyze
                        </button>
                        <button 
                          onClick={() => handleDelete(file.id, file.fileName)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 Excel Analytics. All rights reserved.</p>
      </footer>
        </div>
  );
};

export default Dashboard;
