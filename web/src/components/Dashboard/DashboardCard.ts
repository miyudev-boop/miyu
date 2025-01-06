import React from 'react';
import './DashboardStyles.css';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => (
  <div className="dashboard-card">
    <h2>{title}</h2>
    <p>{value}</p>
  </div>
);

export default DashboardCard;
