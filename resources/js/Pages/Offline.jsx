import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Offline() {
    return (
        <>
            <Head title="Offline" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.072m-3.183 1.757a3 3 0 010 3.558M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                            </svg>
                            <h1 className="text-2xl font-semibold mb-2">You are offline</h1>
                            <p className="mb-6 text-center">
                                You are currently offline. Please check your internet connection and try again.
                            </p>
                            
                            <div className="flex flex-col space-y-3 mt-4">
                                <button 
                                    onClick={() => window.history.back()} 
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                >
                                    Go Back
                                </button>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Offline.layout = page => <DashboardLayout children={page} />;
