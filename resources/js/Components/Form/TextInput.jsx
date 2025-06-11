import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({
  type = 'text',
  className = '',
  isFocused = false,
  isDisabled = false,
  ...props
}, ref) {
  const input = ref ? ref : useRef();

  const styleEnable = `border-gray-300 dark:border-gray-500 focus:border-light-primary focus:ring-light-primary dark:focus:border-dark-primary dark:focus:ring-dark-primary rounded-md shadow-sm bg-white dark:bg-gray-800 text-light-txt dark:text-dark-txt`;
  const styleDisable = 'rounded-md shadow-sm border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-300 cursor-not-allowed';

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={`${
        isDisabled ? styleDisable : styleEnable
      } ${className} ${type === 'number' ? 'appearance-number' : ''}`} // Add number-specific styling if needed
      ref={input}
      readOnly={isDisabled}
      disabled={isDisabled}
      onWheel={type === 'number' ? (e) => e.target.blur() : undefined} // Prevent scroll wheel changes
    />
  );
});