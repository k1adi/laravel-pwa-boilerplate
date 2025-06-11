import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function Dashboard() {
  return (
    <div className='content-box'>
      <h1 className='text--title'>Dashboard Page</h1>
    </div>
  );
}

Dashboard.layout = page => (
  <DashboardLayout title='Dashboard' children={page} />
);

export default Dashboard;
