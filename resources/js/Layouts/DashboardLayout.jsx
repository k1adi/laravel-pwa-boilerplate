import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header/Header';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { ToastContent, ToastWrapper } from '@/Components/Notification/Toast';
import { useLoading } from '@/Context/LoadingContext';
import LoaderScreen from '@/Components/Loader/LoaderScreen';
import NetworkStatusIndicator from '@/Components/NetworkStatusIndicator';

export default function DashboardLayout({ title, children }) {
  const { loading } = useLoading();
  const { flash } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const { 'toast-success': successMessage, 'toast-error': failedMessage } = flash;

    if (successMessage) ToastContent.success(successMessage);
    if (failedMessage) ToastContent.error(failedMessage);
  }, [flash]);

  return (
    <>
      <Head title={title} />

      <ToastWrapper />
      {loading && <LoaderScreen />}

      <main className='app'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='app__content'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className='min-h-screen'>
            {/* <div className='content bg-rss'> */}
            <div className='content bg-light-primary dark:bg-dark-primary'>
              {children}
            </div>
          </div>
        </div>

        {/* Network Status Indicator */}
        <NetworkStatusIndicator />
      </main>
    </>
  );
}
