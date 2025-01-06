import React, { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import './DashboardStyles.css';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching metrics from an API
    const fetchMetrics = async () => {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
  }, []);

  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1>System Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="CPU Usage" value={`${metrics.cpu}%`} />
        <DashboardCard title="Memory Usage" value={`${metrics.memory} MB`} />
        <DashboardCard title="Active Users" value={metrics.activeUsers} />
      </div>
    </div>
  );
};

export default Dashboard;

