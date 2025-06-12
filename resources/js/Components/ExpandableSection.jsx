import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableSection({ title, fontSize='xl', initialExpanded=true, className='', onToggle='', children }){
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle(!isExpanded);
  };

  return (
    <div className={`content-box mb-3 ${className} ${initialExpanded ? 'h-full': 'h-auto'}`}>
      <div
        onClick={handleToggle}
        className={`flex items-center justify-between cursor-pointer ${isExpanded ? 'mb-2' : 'mb-0'}`}
      >
        <h2 className={`text-${fontSize} font-semibold`}>{title}</h2>
        <button
          type='button'
          className='flex items-center text-gray-600 hover:text-gray-900 focus:outline-none p-1'
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-full' : 'overflow-hidden max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}