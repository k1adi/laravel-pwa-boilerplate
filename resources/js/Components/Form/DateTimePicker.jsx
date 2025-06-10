import React, { useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import { usePage } from '@inertiajs/react';
import { Indonesian } from 'flatpickr/dist/l10n/id.js';
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import 'flatpickr/dist/themes/airbnb.css'; 
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import { Trash2 } from 'lucide-react';

export default function DateTimePicker({
  value,
  onChange,
  className = '',
  minDate = '',
  maxDate = '',
  currentDate = '',
  withTime = true,
  shortFormat = false,
  isDisable = false,
  setHour = 10,
  monthSelect = false,
  required = false,
  ...props
}) {
  const flatpickrRef = useRef(null);
  const minimumDate = minDate ? minDate : null;
  const maximumDate = maxDate ? new Date(maxDate) : null;

  const { bu } = usePage().props;

  const handleClear = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.clear();
    }
    onChange(null); 
  };

  const setAltFormat = (withTime, shortFormat, monthSelect) => {
    if (monthSelect) return 'F Y';
    return withTime ? 'j F Y H:i' : (shortFormat ? 'd/m/y' : 'j F Y');
  }

  // Configure the plugins array
  const plugins = [];
  
  // Add the monthSelectPlugin if monthSelect is true
  if (monthSelect) {
    plugins.push(
      monthSelectPlugin({
        shorthand: false,
        dateFormat: 'F Y',
        altFormat: 'F Y',
      })
    );
  }

  return (
    <div className="relative">
      <Flatpickr
        {...props}
        data-enable-time
        options={{
          altInput: true,
          time_24hr: true,
          enableTime: withTime && !monthSelect,
          locale: Indonesian,
          dateFormat: monthSelect ? 'Y-m' : (withTime ? 'Y-m-d H:i:S' : 'Y-m-d'),
          altFormat: setAltFormat(withTime, shortFormat, monthSelect),
          minDate: minimumDate,
          maxDate: maximumDate,
          defaultDate: currentDate,
          defaultHour: setHour,
          clickOpens: !isDisable,
          plugins: plugins,
          required: required,
        }}
        value={value}
        onChange={([selectedDate]) => onChange(selectedDate || null)} 
        ref={flatpickrRef}
        className={`${
          isDisable
            ? 'border-gray-300 bg-gray-100 text-gray-500 focus:border-gray-300 focus:ring-gray-300'
            : `border-gray-300 focus:border-${bu.code} focus:ring-${bu.code}`
        } rounded-md shadow-sm ${className}`}
      />

      {!isDisable && (
        <button
          type="button"
          onClick={handleClear}
          className="ml-2 px-3 py-1 text-gray-400 absolute top-2 right-0"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}