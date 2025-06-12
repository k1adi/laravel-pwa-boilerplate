import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

function Dashboard() {
  // Access environment variables using import.meta.env
  const fpdLink = import.meta.env.VITE_LINK_FPD;
  const lmsLink = import.meta.env.VITE_LINK_LMS;
  const crmLink = import.meta.env.VITE_LINK_CRM;
  const cloneLink = import.meta.env.VITE_LINK_CLONE;
  
  return (
    <div className='content-box'>
      <h1 className='text--title'>Dashboard Page</h1>

      <p> fpdLink</p>
      <a href={fpdLink} target='_blank' rel="noopener noreferrer">FPD</a>

      <p> lmsLink</p>
      <a href={lmsLink} target='_blank' rel="noopener noreferrer">LMS</a>
      
      <p> crmLink</p>
      <a href={crmLink} target='_blank' rel="noopener noreferrer">CRM</a>

      <p>Clone pwa</p>
      <a href={cloneLink} target='_blank' rel="noopener noreferrer">Clone</a>
    </div>
  );
}

Dashboard.layout = page => (
  <DashboardLayout title='Dashboard' children={page} />
);

export default Dashboard;
