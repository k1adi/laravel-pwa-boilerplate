## Continuing from Implementation Guide

### PWA Implementation (continued)

4. Add the InstallPWA component to your Navbar or another appropriate location:
   ```jsx
   // resources/js/Components/Navbar.jsx
   import { Link } from '@inertiajs/react';
   import InstallPWA from './InstallPWA';
   
   export default function Navbar() {
     return (
       <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between h-16">
             <div className="flex">
               <div className="shrink-0 flex items-center">
                 <Link href="/">
                   <img className="h-8 w-auto" src="/icons/icon-72x72.png" alt="Logo" />
                 </Link>
               </div>
               <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                 <Link 
                   href={route('dashboard')} 
                   className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                 >
                   Dashboard
                 </Link>
               </div>
             </div>
             <div className="flex items-center space-x-4">
               <InstallPWA />
               {/* Other navbar items like user dropdown */}
             </div>
           </div>
         </div>
       </nav>
     );
   }
   ```

## 6. UI/UX Development

### Implement Responsive Design
1. Use TailwindCSS responsive utilities to create a responsive layout:
   ```jsx
   // Example of responsive design in a component
   // resources/js/Pages/Dashboard.jsx
   import React from 'react';
   import AppLayout from '@/Layouts/AppLayout';
   import { Head } from '@inertiajs/react';

   export default function Dashboard() {
     return (
       <AppLayout title="Dashboard">
         <Head title="Dashboard" />

         <div className="py-12">
           <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
             <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
               <div className="p-6 text-gray-900 dark:text-gray-100">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Dashboard cards */}
                   <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                     <h2 className="text-xl font-semibold mb-2">Card 1</h2>
                     <p>Card content goes here</p>
                   </div>
                   <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                     <h2 className="text-xl font-semibold mb-2">Card 2</h2>
                     <p>Card content goes here</p>
                   </div>
                   <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                     <h2 className="text-xl font-semibold mb-2">Card 3</h2>
                     <p>Card content goes here</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </AppLayout>
     );
   }
   ```

### Create Dark/Light Mode Toggle
1. Create a theme context:
   ```bash
   mkdir -p resources/js/Contexts
   touch resources/js/Contexts/ThemeContext.jsx
   ```
2. Add content to ThemeContext.jsx:
   ```jsx
   // resources/js/Contexts/ThemeContext.jsx
   import React, { createContext, useContext, useEffect, useState } from 'react';

   const ThemeContext = createContext();

   export function ThemeProvider({ children }) {
     const [darkMode, setDarkMode] = useState(false);

     useEffect(() => {
       // Check local storage or system preference
       const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
         (!('darkMode' in localStorage) && 
           window.matchMedia('(prefers-color-scheme: dark)').matches);
       
       setDarkMode(isDarkMode);
       
       // Apply theme to document
       if (isDarkMode) {
         document.documentElement.classList.add('dark');
       } else {
         document.documentElement.classList.remove('dark');
       }
     }, []);

     const toggleDarkMode = () => {
       const newDarkMode = !darkMode;
       setDarkMode(newDarkMode);
       localStorage.setItem('darkMode', newDarkMode.toString());
       
       if (newDarkMode) {
         document.documentElement.classList.add('dark');
       } else {
         document.documentElement.classList.remove('dark');
       }
     };

     return (
       <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
         {children}
       </ThemeContext.Provider>
     );
   }

   export function useTheme() {
     return useContext(ThemeContext);
   }
   ```
3. Create a theme toggle component:
   ```bash
   touch resources/js/Components/ThemeToggle.jsx
   ```
4. Add content to ThemeToggle.jsx:
   ```jsx
   // resources/js/Components/ThemeToggle.jsx
   import React from 'react';
   import { useTheme } from '@/Contexts/ThemeContext';

   export default function ThemeToggle() {
     const { darkMode, toggleDarkMode } = useTheme();

     return (
       <button
         onClick={toggleDarkMode}
         className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
         aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
       >
         {darkMode ? (
           <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
             />
           </svg>
         ) : (
           <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
             />
           </svg>
         )}
       </button>
     );
   }
   ```
5. Update the app.jsx to use the ThemeProvider:
   ```jsx
   // resources/js/app.jsx
   import './bootstrap';
   import '../css/app.css';

   import { createRoot } from 'react-dom/client';
   import { createInertiaApp } from '@inertiajs/react';
   import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
   import { ThemeProvider } from './Contexts/ThemeContext';

   const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

   createInertiaApp({
     title: (title) => `${title} - ${appName}`,
     resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
     setup({ el, App, props }) {
       const root = createRoot(el);

       root.render(
         <ThemeProvider>
           <App {...props} />
         </ThemeProvider>
       );
     },
     progress: {
       color: '#4B5563',
     },
   });
   ```
6. Add the ThemeToggle to your Navbar:
   ```jsx
   // resources/js/Components/Navbar.jsx
   import ThemeToggle from './ThemeToggle';
   
   // In the navbar component:
   <div className="flex items-center space-x-4">
     <ThemeToggle />
     <InstallPWA />
     {/* Other navbar items */}
   </div>
   ```

### Design Skeleton Loading Components
1. Create a skeleton loading component:
   ```bash
   touch resources/js/Components/SkeletonLoader.jsx
   ```
2. Add content to SkeletonLoader.jsx:
   ```jsx
   // resources/js/Components/SkeletonLoader.jsx
   import React from 'react';

   export default function SkeletonLoader({ type = 'card', count = 1 }) {
     const renderSkeleton = () => {
       switch (type) {
         case 'card':
           return (
             <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
             </div>
           );
         case 'profile':
           return (
             <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
               <div className="flex items-center space-x-4">
                 <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                 <div className="flex-1">
                   <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                   <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                 </div>
               </div>
             </div>
           );
         case 'text':
           return (
             <div className="animate-pulse">
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
             </div>
           );
         default:
           return null;
       }
     };

     return (
       <div className="space-y-4">
         {Array.from({ length: count }).map((_, index) => (
           <div key={index}>{renderSkeleton()}</div>
         ))}
       </div>
     );
   }
   ```
3. Use the skeleton loader in your components:
   ```jsx
   // Example usage in a component
   import SkeletonLoader from '@/Components/SkeletonLoader';
   
   // In your component:
   {isLoading ? (
     <SkeletonLoader type="card" count={3} />
   ) : (
     // Your actual content
   )}
   ```

### Implement Async Image Loading
1. Create an async image component:
   ```bash
   touch resources/js/Components/AsyncImage.jsx
   ```
2. Add content to AsyncImage.jsx:
   ```jsx
   // resources/js/Components/AsyncImage.jsx
   import React, { useState, useEffect } from 'react';

   export default function AsyncImage({ src, alt, className, placeholder = null }) {
     const [loaded, setLoaded] = useState(false);
     const [error, setError] = useState(false);
     
     useEffect(() => {
       const img = new Image();
       img.src = src;
       img.onload = () => setLoaded(true);
       img.onerror = () => setError(true);
       
       return () => {
         img.onload = null;
         img.onerror = null;
       };
     }, [src]);
     
     if (error) {
       return (
         <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
           <span className="text-gray-500 dark:text-gray-400">Failed to load image</span>
         </div>
       );
     }
     
     return loaded ? (
       <img src={src} alt={alt} className={className} />
     ) : (
       placeholder || (
         <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}></div>
       )
     );
   }
   ```
3. Use the async image component in your application:
   ```jsx
   // Example usage
   import AsyncImage from '@/Components/AsyncImage';
   
   // In your component:
   <AsyncImage 
     src="/path/to/image.jpg" 
     alt="Description" 
     className="w-full h-48 object-cover rounded-lg" 
   />
   ```

## 7. API Integration

### Create Custom Fetch API with React useEffect
1. Create an API service:
   ```bash
   mkdir -p resources/js/Services
   touch resources/js/Services/ApiService.js
   ```
2. Add content to ApiService.js:
   ```js
   // resources/js/Services/ApiService.js
   const API_BASE_URL = '/api';

   // Default options for fetch
   const defaultOptions = {
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'X-Requested-With': 'XMLHttpRequest',
     },
   };

   // Get CSRF token from meta tag
   const getCsrfToken = () => {
     return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
   };

   // Add CSRF token to options for non-GET requests
   const addCsrfToken = (options) => {
     if (options.method && options.method !== 'GET') {
       return {
         ...options,
         headers: {
           ...options.headers,
           'X-CSRF-TOKEN': getCsrfToken(),
         },
       };
     }
     return options;
   };

   // Main fetch function
   const apiFetch = async (endpoint, options = {}) => {
     const url = `${API_BASE_URL}${endpoint}`;
     const fetchOptions = addCsrfToken({
       ...defaultOptions,
       ...options,
       headers: {
         ...defaultOptions.headers,
         ...options.headers,
       },
     });
     
     try {
       const response = await fetch(url, fetchOptions);
       
       // Check if the response is ok
       if (!response.ok) {
         const errorData = await response.json().catch(() => null);
         throw {
           status: response.status,
           statusText: response.statusText,
           data: errorData,
         };
       }
       
       // Parse JSON response
       const data = await response.json();
       return data;
     } catch (error) {
       // Log error and rethrow
       console.error('API request failed:', error);
       throw error;
     }
   };

   // Helper methods for common HTTP methods
   export const ApiService = {
     get: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: 'GET' }),
     post: (endpoint, data, options = {}) => apiFetch(endpoint, { 
       ...options, 
       method: 'POST',
       body: JSON.stringify(data),
     }),
     put: (endpoint, data, options = {}) => apiFetch(endpoint, { 
       ...options, 
       method: 'PUT',
       body: JSON.stringify(data),
     }),
     patch: (endpoint, data, options = {}) => apiFetch(endpoint, { 
       ...options, 
       method: 'PATCH',
       body: JSON.stringify(data),
     }),
     delete: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: 'DELETE' }),
   };

   // Custom hook for data fetching
   export const useApi = (endpoint, options = {}) => {
     const [data, setData] = React.useState(null);
     const [error, setError] = React.useState(null);
     const [loading, setLoading] = React.useState(true);
     
     React.useEffect(() => {
       let isMounted = true;
       
       const fetchData = async () => {
         try {
           setLoading(true);
           const result = await ApiService.get(endpoint, options);
           
           if (isMounted) {
             setData(result);
             setError(null);
           }
         } catch (error) {
           if (isMounted) {
             setError(error);
             setData(null);
           }
         } finally {
           if (isMounted) {
             setLoading(false);
           }
         }
       };
       
       fetchData();
       
       return () => {
         isMounted = false;
       };
     }, [endpoint, JSON.stringify(options)]);
     
     return { data, error, loading, refetch: () => {} };
   };
   ```
3. Use the API service in your components:
   ```jsx
   // Example usage in a component
   import { ApiService, useApi } from '@/Services/ApiService';
   import SkeletonLoader from '@/Components/SkeletonLoader';
   
   // Using the hook for GET requests
   function UserList() {
     const { data, error, loading } = useApi('/users');
     
     if (loading) return <SkeletonLoader type="card" count={5} />;
     if (error) return <div>Error loading users: {error.message}</div>;
     
     return (
       <div>
         {data.map(user => (
           <div key={user.id}>{user.name}</div>
         ))}
       </div>
     );
   }
   
   // Using the service directly for other methods
   function CreateUserForm() {
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [loading, setLoading] = useState(false);
     
     const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       
       try {
         const response = await ApiService.post('/users', { name, email });
         console.log('User created:', response);
         // Handle success
       } catch (error) {
         console.error('Failed to create user:', error);
         // Handle error
       } finally {
         setLoading(false);
       }
     };
     
     // Form JSX...
   }
   ```
