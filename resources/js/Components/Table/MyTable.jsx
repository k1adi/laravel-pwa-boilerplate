import React, { useState } from 'react';

export default function MyTable({ from, data, columns, handleClick = '', withFilter = false }) {
  const [filterText, setFilterText] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');

  // Filter data based on input
  const filteredData = data.filter(item => {
    if (!filterText) return true;
    
    if (filterColumn === 'all') {
      // Search all columns
      return columns.some(col => {
        const value = item[col.key]?.toString().toLowerCase() || '';
        return value.includes(filterText.toLowerCase());
      });
    } else {
      // Search specific column
      const value = item[filterColumn]?.toString().toLowerCase() || '';
      return value.includes(filterText.toLowerCase());
    }
  });

  function renderCell(col, rowIndex, item) {
    if (col.key === 'id') {
      return from + rowIndex;
    }
    return col.render ? col.render(item, rowIndex) : item[col.key];
  }

  return (
    <div>
      {withFilter && (
        <div className="flex space-x-2 mt-3">
        <input
          type="text"
          placeholder="Filter..."
          className="input input-bordered rounded-md"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <select 
          className="select select-bordered rounded-md"
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="all">All Columns</option>
          {columns.map(col => (
            <option key={col.key} value={col.key}>{col.label}</option>
          ))}
        </select>
        </div>
      )}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={col.classHead}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length !== 0 ? filteredData.map((item, index) => (
              <tr
                key={index}
                className={`
                  ${index % 2 !== 0 ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'} 
                  group ${handleClick && 'cursor-pointer'}
                `}
                onClick={() => handleClick && handleClick(item)}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`group-hover:text-light-primary dark:group-hover:text-dark-primary ` + col.classBody}>
                    { renderCell(col, index, item) }
                  </td>
                ))}
              </tr>
            )) : (
              <tr className='text-center'>
                <td colSpan={(columns.length + 1)}>No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}