'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './dashboard.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // Sample data for the frequency graph
    const frequencyData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
            {
                label: 'Vibration Frequency (Hz)',
                data: [2.5, 2.8, 3.1, 2.9, 2.7, 2.6],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Sample data for the amplitude graph
    const amplitudeData = {
        labels: ['0-1 Hz', '1-2 Hz', '2-3 Hz', '3-4 Hz', '4-5 Hz'],
        datasets: [
            {
                label: 'Amplitude Distribution',
                data: [5, 15, 30, 25, 10],
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                borderColor: '#4caf50',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#ffffff'
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#ffffff'
                }
            }
        }
    };

    // Sample data for the table
    const tableData = [
        { id: 1, sensor: 'Sensor A', status: 'Active', lastReading: '2.5 Hz', location: 'Zone 1' },
        { id: 2, sensor: 'Sensor B', status: 'Active', lastReading: '3.1 Hz', location: 'Zone 2' },
        { id: 3, sensor: 'Sensor C', status: 'Maintenance', lastReading: '0 Hz', location: 'Zone 3' },
        { id: 4, sensor: 'Sensor D', status: 'Active', lastReading: '2.8 Hz', location: 'Zone 1' },
    ];

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Vibration Sensor Dashboard</h1>
            
            <div className="dashboard-grid">
                {/* Graph Section */}
                <div className="dashboard-card graph-card">
                    <h2>Vibration Frequency Over Time</h2>
                    <div className="graph-container">
                        <Line data={frequencyData} options={chartOptions} />
                    </div>
                </div>

                <div className="dashboard-card graph-card">
                    <h2>Amplitude Distribution</h2>
                    <div className="graph-container">
                        <Bar data={amplitudeData} options={chartOptions} />
                    </div>
                </div>

                {/* Information Section */}
                <div className="dashboard-card info-card">
                    <h2>System Status</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <h3>Active Sensors</h3>
                            <p className="info-value">12</p>
                        </div>
                        <div className="info-item">
                            <h3>Alerts</h3>
                            <p className="info-value warning">3</p>
                        </div>
                        <div className="info-item">
                            <h3>Average Frequency</h3>
                            <p className="info-value">2.8 Hz</p>
                        </div>
                        <div className="info-item">
                            <h3>System Health</h3>
                            <p className="info-value success">98%</p>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="dashboard-card table-card">
                    <h2>Sensor Status</h2>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Sensor ID</th>
                                    <th>Status</th>
                                    <th>Last Reading</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.sensor}</td>
                                        <td>
                                            <span className={`status-badge ${row.status.toLowerCase()}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td>{row.lastReading}</td>
                                        <td>{row.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

