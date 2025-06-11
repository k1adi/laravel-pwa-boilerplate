import React, { useEffect, useState } from 'react';
import { SunMedium, Moon } from "lucide-react"

export default function ToggleTheme({ className = '' }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button 
      onClick={toggleTheme} 
      className={`flex items-center justify-between w-full px-6 py-4 border-b border-stroke dark:border-gray-500 ${className}`}
    >
      <span className="flex items-center gap-3 font-medium">
        {theme === 'dark' ? (
          <>
            <Moon /> 
            <span className="dark:text-dark-txt">Dark</span>
          </>
        ) : (
          <>
            <SunMedium /> 
            <span className="text-light-txt">Light</span>
          </>
        )}
      </span>
    </button>
  )
}