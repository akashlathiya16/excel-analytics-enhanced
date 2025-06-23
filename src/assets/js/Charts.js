import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../css/Charts.css';

const Charts = ({ data, chartType = 'bar' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
              size: 16,
              weight: 'bold'
            },
            color: '#2e7d32'
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(46, 125, 50, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#2e7d32',
            borderWidth: 1
          }
        },
        scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
          x: {
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              color: '#666'
            }
          },
          y: {
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              color: '#666'
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
  }, [data, chartType]);

  const getBackgroundColors = (index) => {
    const colors = [
      'rgba(46, 125, 50, 0.8)',   // Green
      'rgba(33, 150, 243, 0.8)',  // Blue
      'rgba(255, 152, 0, 0.8)',   // Orange
      'rgba(156, 39, 176, 0.8)',  // Purple
      'rgba(244, 67, 54, 0.8)',   // Red
      'rgba(0, 150, 136, 0.8)',   // Teal
      'rgba(255, 193, 7, 0.8)',   // Amber
      'rgba(121, 85, 72, 0.8)'    // Brown
    ];
    return colors[index % colors.length];
  };

  const getBorderColors = (index) => {
    const colors = [
      'rgba(46, 125, 50, 1)',   // Green
      'rgba(33, 150, 243, 1)',  // Blue
      'rgba(255, 152, 0, 1)',   // Orange
      'rgba(156, 39, 176, 1)',  // Purple
      'rgba(244, 67, 54, 1)',   // Red
      'rgba(0, 150, 136, 1)',   // Teal
      'rgba(255, 193, 7, 1)',   // Amber
      'rgba(121, 85, 72, 1)'    // Brown
    ];
    return colors[index % colors.length];
  };

  if (!data || !data.labels || !data.datasets) {
    return (
      <div className="chart-container">
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <h3>No Data Available</h3>
          <p>Upload an Excel file to generate charts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-analytics-container">
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
      </div>
      
      {/* Analytics Information */}
      {data.analytics && (
        <div className="analytics-info">
          <div className="analytics-header">
            <h3>📊 Analytics Insights</h3>
            <p>File: {data.analytics.fileName}</p>
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
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="analytics-section">
              <h4>🎯 Recommendations</h4>
              <ul className="recommendations-list">
                {data.analytics.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
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
    { value: 'polarArea', label: 'Polar Area', icon: '🌟' }
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