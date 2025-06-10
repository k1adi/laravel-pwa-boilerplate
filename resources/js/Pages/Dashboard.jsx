import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function Dashboard() {
  return (
    <div className='content-box'>
      <p>Dashboard page</p>
    </div>
  );
}

Dashboard.layout = page => (
  <DashboardLayout title='Dashboard' children={page} />
);

export default Dashboard;
