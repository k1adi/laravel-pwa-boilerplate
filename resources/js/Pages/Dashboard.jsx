import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function Dashboard() {
  // Access environment variables using import.meta.env
  const fpdLink = import.meta.env.VITE_LINK_FPD;
  const lmsLink = import.meta.env.VITE_LINK_LMS;
  const crmLink = import.meta.env.VITE_LINK_CRM;
  
  return (
    <div className='content-box'>
      <h1 className='text--title'>Dashboard Page</h1>

      <a href={fpdLink} target='_blank' rel="noopener noreferrer">FPD</a>
      <a href={lmsLink} target='_blank' rel="noopener noreferrer">LMS</a>
      <a href={crmLink} target='_blank' rel="noopener noreferrer">CRM</a>
    </div>
  );
}

Dashboard.layout = page => (
  <DashboardLayout title='Dashboard' children={page} />
);

export default Dashboard;
