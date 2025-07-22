import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useVersion } from '../../contexts/VersionContext';
import '../css/Charts.css';

const Charts = ({ data, chartType = 'bar' }) => {
  const { isNewVersion } = useVersion();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const chartContainerRef = useRef(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportType, setExportType] = useState('png'); // 'png' or 'pdf'

  useEffect(() => {
    if (!data || !data.labels || !data.datasets) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Chart configuration
    const config = {
      type: chartType,
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: getBackgroundColors(index),
          borderColor: getBorderColors(index),
          borderWidth: 2,
          borderRadius: chartType === 'bar' ? 4 : 0,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: data.title || 'Chart',
            font: {
              size: isNewVersion ? 18 : 16,
              weight: 'bold',
              family: isNewVersion ? "'Courier New', monospace" : undefined
            },
            color: isNewVersion ? '#00ff88' : '#2e7d32'
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: isNewVersion ? '#00ff88' : '#333',
              font: {
                size: isNewVersion ? 14 : 12,
                family: isNewVersion ? "'Courier New', monospace" : undefined,
                weight: isNewVersion ? 'bold' : 'normal'
              }
            }
          },
          tooltip: {
            backgroundColor: isNewVersion ? 'rgba(0, 255, 136, 0.9)' : 'rgba(46, 125, 50, 0.9)',
            titleColor: isNewVersion ? '#000' : '#fff',
            bodyColor: isNewVersion ? '#000' : '#fff',
            borderColor: isNewVersion ? '#00ff88' : '#2e7d32',
            borderWidth: isNewVersion ? 2 : 1,
            titleFont: {
              family: isNewVersion ? "'Courier New', monospace" : undefined,
              weight: isNewVersion ? 'bold' : 'normal'
            },
            bodyFont: {
              family: isNewVersion ? "'Courier New', monospace" : undefined,
              weight: isNewVersion ? 'bold' : 'normal'
            }
          }
        },
        scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
          x: {
            grid: {
              color: isNewVersion ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0,0,0,0.1)'
            },
            ticks: {
              color: isNewVersion ? '#00ff88' : '#666',
              font: {
                family: isNewVersion ? "'Courier New', monospace" : undefined,
                weight: isNewVersion ? 'bold' : 'normal'
              }
            }
          },
          y: {
            grid: {
              color: isNewVersion ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0,0,0,0.1)'
            },
            ticks: {
              color: isNewVersion ? '#00ff88' : '#666',
              font: {
                family: isNewVersion ? "'Courier New', monospace" : undefined,
                weight: isNewVersion ? 'bold' : 'normal'
              }
            },
            beginAtZero: true
          }
        } : {},
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    };

    // Create new chart
    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartType, isNewVersion]);

  const getBackgroundColors = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.8)',   // Pink/Red
      'rgba(54, 162, 235, 0.8)',   // Blue
      'rgba(255, 206, 86, 0.8)',   // Yellow
      'rgba(75, 192, 192, 0.8)',   // Teal
      'rgba(153, 102, 255, 0.8)',  // Purple
      'rgba(255, 159, 64, 0.8)',   // Orange
      'rgba(199, 199, 199, 0.8)',  // Gray
      'rgba(83, 102, 255, 0.8)',   // Indigo
      'rgba(255, 99, 255, 0.8)',   // Magenta
      'rgba(99, 255, 132, 0.8)',   // Lime
      'rgba(255, 159, 243, 0.8)',  // Light Pink
      'rgba(132, 99, 255, 0.8)'    // Light Purple
    ];
    
    // For pie and doughnut charts, return array of colors
    if (chartType === 'pie' || chartType === 'doughnut') {
      return colors;
    }
    
    return colors[index % colors.length];
  };

  const getBorderColors = (index) => {
    const colors = [
      'rgba(255, 99, 132, 1)',   // Pink/Red
      'rgba(54, 162, 235, 1)',   // Blue
      'rgba(255, 206, 86, 1)',   // Yellow
      'rgba(75, 192, 192, 1)',   // Teal
      'rgba(153, 102, 255, 1)',  // Purple
      'rgba(255, 159, 64, 1)',   // Orange
      'rgba(199, 199, 199, 1)',  // Gray
      'rgba(83, 102, 255, 1)',   // Indigo
      'rgba(255, 99, 255, 1)',   // Magenta
      'rgba(99, 255, 132, 1)',   // Lime
      'rgba(255, 159, 243, 1)',  // Light Pink
      'rgba(132, 99, 255, 1)'    // Light Purple
    ];
    
    // For pie and doughnut charts, return array of colors
    if (chartType === 'pie' || chartType === 'doughnut') {
      return colors;
    }
    
    return colors[index % colors.length];
  };

  // Generate all chart types
  const generateAllChartTypes = async () => {
    const chartTypes = ['bar', 'line', 'pie', 'doughnut', 'polarArea'];
    const chartCanvases = [];
    
    for (let type of chartTypes) {
      // Create temporary canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 800;
      tempCanvas.height = 400;
      const tempCtx = tempCanvas.getContext('2d');
      
      // Create chart configuration
      const config = {
        type: type,
        data: {
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: getBackgroundColors(index),
            borderColor: getBorderColors(index),
            borderWidth: 2,
            borderRadius: type === 'bar' ? 4 : 0,
          }))
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${data.title || 'Chart'} - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
              font: { 
                size: isNewVersion ? 18 : 16, 
                weight: 'bold',
                family: isNewVersion ? "'Courier New', monospace" : undefined
              },
              color: isNewVersion ? '#00ff88' : '#2e7d32'
            },
            legend: {
              display: true,
              position: 'top',
              labels: { 
                color: isNewVersion ? '#00ff88' : '#333', 
                font: { 
                  size: isNewVersion ? 14 : 12,
                  family: isNewVersion ? "'Courier New', monospace" : undefined,
                  weight: isNewVersion ? 'bold' : 'normal'
                } 
              }
            }
          },
          scales: type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' ? {
            x: { 
              grid: { color: isNewVersion ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0,0,0,0.1)' }, 
              ticks: { 
                color: isNewVersion ? '#00ff88' : '#666',
                font: {
                  family: isNewVersion ? "'Courier New', monospace" : undefined,
                  weight: isNewVersion ? 'bold' : 'normal'
                }
              } 
            },
            y: { 
              grid: { color: isNewVersion ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0,0,0,0.1)' }, 
              ticks: { 
                color: isNewVersion ? '#00ff88' : '#666',
                font: {
                  family: isNewVersion ? "'Courier New', monospace" : undefined,
                  weight: isNewVersion ? 'bold' : 'normal'
                }
              }, 
              beginAtZero: true 
            }
          } : {},
          animation: false
        }
      };
      
      // Create temporary chart
      const tempChart = new Chart(tempCtx, config);
      
      // Convert to image
      const imageData = tempCanvas.toDataURL('image/png');
      chartCanvases.push({
        type: type,
        canvas: tempCanvas,
        imageData: imageData,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`
      });
      
      // Destroy temporary chart
      tempChart.destroy();
    }
    
    return chartCanvases;
  };

  // Export to PNG function
  const exportToPNG = async (includeAnalytics = false) => {
    try {
      if (includeAnalytics) {
        // Hide export buttons during capture
        const exportButtons = document.querySelector('.chart-export-buttons');
        const originalDisplay = exportButtons.style.display;
        exportButtons.style.display = 'none';
        
        // Wait a moment for DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Capture entire analytics container
        const elementToCapture = chartContainerRef.current.closest('.chart-analytics-container');
        const canvas = await html2canvas(elementToCapture, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true,
          height: elementToCapture.scrollHeight,
          width: elementToCapture.scrollWidth
        });
        
        // Restore export buttons
        exportButtons.style.display = originalDisplay;
        
        const link = document.createElement('a');
        link.download = `${data.title || 'chart'}-complete-analysis.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('Complete analysis exported as PNG successfully!');
      } else {
        // Generate all chart types
        const allCharts = await generateAllChartTypes();
        
        // Create combined canvas
        const combinedCanvas = document.createElement('canvas');
        const canvasWidth = 1600; // 2 charts per row
        const canvasHeight = 1400; // Increased height for 5 charts
        combinedCanvas.width = canvasWidth;
        combinedCanvas.height = canvasHeight;
        const combinedCtx = combinedCanvas.getContext('2d');
        
        // White background
        combinedCtx.fillStyle = '#ffffff';
        combinedCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Add title
        combinedCtx.fillStyle = '#2e7d32';
        combinedCtx.font = 'bold 24px Arial';
        combinedCtx.textAlign = 'center';
        combinedCtx.fillText(data.title || 'Chart Analysis - All Types', canvasWidth / 2, 40);
        
        // Position charts in grid (3 rows layout for 5 charts)
        const positions = [
          { x: 50, y: 80, width: 700, height: 350 },     // Top left
          { x: 850, y: 80, width: 700, height: 350 },    // Top right
          { x: 50, y: 480, width: 700, height: 350 },    // Middle left
          { x: 850, y: 480, width: 700, height: 350 },   // Middle right
          { x: 400, y: 880, width: 800, height: 400 }    // Bottom center (bigger for 5th chart)
        ];
        
        // Draw each chart with proper loading handling
        let loadedCharts = 0;
        const totalCharts = allCharts.length;
        
        allCharts.forEach((chart, index) => {
          if (index < positions.length) {
            const pos = positions[index];
            const img = new Image();
            img.onload = () => {
              combinedCtx.drawImage(img, pos.x, pos.y, pos.width, pos.height);
              loadedCharts++;
              
              // When all charts are loaded, download the combined image
              if (loadedCharts === totalCharts) {
                setTimeout(() => {
                  const link = document.createElement('a');
                  link.download = `${data.title || 'chart'}-all-charts.png`;
                  link.href = combinedCanvas.toDataURL('image/png');
                  link.click();
                  alert('All chart types exported as PNG successfully!');
                }, 200);
              }
            };
            img.onerror = () => {
              console.error(`Failed to load chart ${index}`);
              loadedCharts++;
              if (loadedCharts === totalCharts) {
                setTimeout(() => {
                  const link = document.createElement('a');
                  link.download = `${data.title || 'chart'}-all-charts.png`;
                  link.href = combinedCanvas.toDataURL('image/png');
                  link.click();
                  alert('All chart types exported as PNG successfully!');
                }, 200);
              }
            };
            img.src = chart.imageData;
          }
        });
      }
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Error exporting PNG. Please try again.');
    }
  };

  // Export to PDF function
  const exportToPDF = async (includeAnalytics = false) => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add title page
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text(data.title || 'Chart Analysis Report', pdfWidth / 2, 40, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pdfWidth / 2, 60, { align: 'center' });
      
      if (includeAnalytics) {
        pdf.text('Complete Analysis with All Chart Types', pdfWidth / 2, 80, { align: 'center' });
      } else {
        pdf.text('All Chart Types Visualization', pdfWidth / 2, 80, { align: 'center' });
      }
      
      // Generate all chart types
      const allCharts = await generateAllChartTypes();
      
      // Add each chart on separate page
      allCharts.forEach((chart, index) => {
        pdf.addPage();
        let currentY = 20;
        
        // Chart title
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${chart.title}`, pdfWidth / 2, currentY, { align: 'center' });
        currentY += 20;
        
        // Add chart image
        const img = chart.imageData;
        const imgWidth = pdfWidth - 20;
        const imgHeight = (imgWidth * 400) / 800; // Maintain aspect ratio
        
        let finalHeight = imgHeight;
        if (finalHeight > 150) {
          finalHeight = 150;
        }
        
        const x = (pdfWidth - imgWidth) / 2;
        pdf.addImage(img, 'PNG', x, currentY, imgWidth, finalHeight);
        currentY += finalHeight + 20;
        
        // Add chart type description
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const descriptions = {
          bar: 'Bar charts are ideal for comparing different categories or showing changes over time.',
          line: 'Line charts are perfect for showing trends and changes over continuous time periods.',
          pie: 'Pie charts display the proportion of different categories as parts of a whole.',
          doughnut: 'Doughnut charts are similar to pie charts but with a hollow center for additional information.',
          polarArea: 'Polar area charts combine features of pie charts and bar charts in a circular format.'
        };
        
        const description = descriptions[chart.type] || 'This chart type provides a unique visualization perspective.';
        const lines = pdf.splitTextToSize(description, pdfWidth - 40);
        lines.forEach(line => {
          pdf.text(line, 20, currentY);
          currentY += 6;
        });
      });
      
             // Add analytics if requested
       if (includeAnalytics && data.analytics) {
         // Add analytics section after all charts
         pdf.addPage();
         let currentY = 20;
         
         // Analytics title
         pdf.setFontSize(18);
         pdf.setFont('helvetica', 'bold');
         pdf.text('Complete Data Analysis', pdfWidth / 2, currentY, { align: 'center' });
         currentY += 20;
         
         // Summary Statistics
         pdf.setFontSize(14);
         pdf.setFont('helvetica', 'bold');
         pdf.text('Summary Statistics', 15, currentY);
         currentY += 10;
         
         pdf.setFontSize(10);
         pdf.setFont('helvetica', 'normal');
         const stats = data.analytics.summary;
         const statsText = [
           `Total Sales: ${stats.totalSales} units`,
           `Total Revenue: ${stats.totalRevenue}K`,
           `Average Sales: ${stats.avgSales} units per period`,
           `Average Revenue: ${stats.avgRevenue}K per period`,
           `Best Performing Month: ${stats.bestMonth} (${stats.maxSales} units)`,
           `Lowest Performing Month: ${stats.worstMonth} (${stats.minSales} units)`
         ];
         
         statsText.forEach(stat => {
           pdf.text(`• ${stat}`, 20, currentY);
           currentY += 7;
         });
         
         currentY += 15;
         
         // Key Insights
         if (currentY > pdfHeight - 60) {
           pdf.addPage();
           currentY = 20;
         }
         
         pdf.setFontSize(14);
         pdf.setFont('helvetica', 'bold');
         pdf.text('Key Insights', 15, currentY);
         currentY += 10;
         
         pdf.setFontSize(9);
         pdf.setFont('helvetica', 'normal');
         data.analytics.insights.forEach((insight, index) => {
           const lines = pdf.splitTextToSize(`${index + 1}. ${insight}`, pdfWidth - 40);
           lines.forEach(line => {
             if (currentY > pdfHeight - 20) {
               pdf.addPage();
               currentY = 20;
             }
             pdf.text(line, 20, currentY);
             currentY += 6;
           });
           currentY += 4;
         });
         
         currentY += 15;
         
         // Recommendations
         if (currentY > pdfHeight - 60) {
           pdf.addPage();
           currentY = 20;
         }
         
         pdf.setFontSize(14);
         pdf.setFont('helvetica', 'bold');
         pdf.text('Strategic Recommendations', 15, currentY);
         currentY += 10;
         
         pdf.setFontSize(9);
         pdf.setFont('helvetica', 'normal');
         data.analytics.recommendations.forEach((rec, index) => {
           const lines = pdf.splitTextToSize(`${index + 1}. ${rec}`, pdfWidth - 40);
           lines.forEach(line => {
             if (currentY > pdfHeight - 20) {
               pdf.addPage();
               currentY = 20;
             }
             pdf.text(line, 20, currentY);
             currentY += 6;
           });
           currentY += 4;
         });
       }
      
      // Add footer to all pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Page ${i} of ${totalPages}`, pdfWidth - 30, pdfHeight - 10);
      }
      
      // Download PDF
      const fileName = includeAnalytics ? 
        `${data.title || 'chart'}-complete-analysis.pdf` : 
        `${data.title || 'chart'}-chart-only.pdf`;
      pdf.save(fileName);
      
      // Show success message
      const message = includeAnalytics ? 
        'Complete analysis exported as PDF successfully!' : 
        'Chart exported as PDF successfully!';
      alert(message);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    }
  };

  if (!data || !data.labels || !data.datasets) {
    return (
      <div className="chart-container">
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <h3>📈 No Data Available</h3>
          <p>📁 Upload an Excel file to generate charts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-analytics-container">
      {/* Export buttons */}
      <div className="chart-export-buttons">
        <div className="export-dropdown">
          <button 
            className="export-btn png-btn" 
            onClick={() => {setExportType('png'); setShowExportOptions(!showExportOptions);}}
          >
            🖼️ Export PNG ▼
          </button>
          {showExportOptions && exportType === 'png' && (
            <div className="export-options">
              <button onClick={() => {exportToPNG(false); setShowExportOptions(false);}}>
                📊 Chart Only
              </button>
              <button onClick={() => {exportToPNG(true); setShowExportOptions(false);}}>
                📋 Complete Analysis
              </button>
            </div>
          )}
        </div>
        
        <div className="export-dropdown">
          <button 
            className="export-btn pdf-btn" 
            onClick={() => {setExportType('pdf'); setShowExportOptions(!showExportOptions);}}
          >
            📄 Export PDF ▼
          </button>
          {showExportOptions && exportType === 'pdf' && (
            <div className="export-options">
              <button onClick={() => {exportToPDF(false); setShowExportOptions(false);}}>
                📊 Chart Only
              </button>
              <button onClick={() => {exportToPDF(true); setShowExportOptions(false);}}>
                📋 Complete Analysis
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="chart-container" ref={chartContainerRef}>
        <canvas ref={chartRef}></canvas>
      </div>
      
      {/* Analytics Information */}
      {data.analytics && (
        <div className="analytics-info">
          <div className="analytics-header">
            <h3>📊 Analytics Insights</h3>
            <p>📁 File: {data.analytics.fileName}</p>
          </div>
          
          <div className="analytics-content">
            {/* Summary Stats */}
            <div className="analytics-section">
              <h4>📈 Summary Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total Sales:</span>
                  <span className="stat-value">{data.analytics.summary.totalSales}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Revenue:</span>
                  <span className="stat-value">{data.analytics.summary.totalRevenue}K</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Sales:</span>
                  <span className="stat-value">{data.analytics.summary.avgSales}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Revenue:</span>
                  <span className="stat-value">{data.analytics.summary.avgRevenue}K</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="analytics-section">
              <h4>💡 Key Insights</h4>
              <ul className="insights-list">
                {data.analytics.insights.map((insight, index) => (
                  <li key={index}>💡 {insight}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="analytics-section">
              <h4>🎯 Recommendations</h4>
              <ul className="recommendations-list">
                {data.analytics.recommendations.map((recommendation, index) => (
                  <li key={index}>🎯 {recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Chart Type Selector Component
export const ChartTypeSelector = ({ currentType, onTypeChange }) => {
  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'doughnut', label: 'Doughnut Chart', icon: '🍩' },
    { value: 'radar', label: 'Radar Chart', icon: '🎯' },
    { value: 'polarArea', label: 'Polar Area', icon: '⭐' }
  ];

  return (
    <div className="chart-type-selector">
      <h4>Chart Type</h4>
      <div className="chart-types">
        {chartTypes.map((type) => (
          <button
            key={type.value}
            className={`chart-type-btn ${currentType === type.value ? 'active' : ''}`}
            onClick={() => onTypeChange(type.value)}
            title={type.label}
          >
            <span className="chart-icon">{type.icon}</span>
            <span className="chart-label">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Charts; 