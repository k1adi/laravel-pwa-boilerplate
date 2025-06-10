import React, { useState } from 'react';

export default function FieldGroup({ 
  label, 
  name, 
  isPrimary, 
  children, 
  className='', 
  error='', 
  maxLength='',
  valueLength=0
}) {
  const [currentLength, setCurrentLength] = useState(valueLength);

  // Handle input change and enforce maxLength
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Update current length only if maxLength is not exceeded
    if (!maxLength || inputValue.length <= maxLength) {
      setCurrentLength(inputValue.length);

      // Trigger the child input's onChange handler if it exists
      children.props.onChange?.(e);
    }
  };

  // Add props dynamically to the child input field when maxLength is set
  const renderChildWithProps = () => {
    if (maxLength) {
      return React.cloneElement(children, {
        onChange: handleInputChange,
        value: children.props.value?.slice(0, maxLength), // Enforce maxLength at the input level
      });
    }

    // Return the child as is when maxLength is not set
    return children;
  };

  return (
    <div className={`mb-3 ` + className}>
      <div className='flex flex-row items-end justify-between'>
        {label && (
          <label className='form--label' htmlFor={name}>
            {label} {isPrimary && <span className='form--primary'>*</span> }
          </label>
        )}

        {maxLength && (
          <span className="form--max-length">
            {" "}
            {currentLength}/{maxLength}
          </span>
        )}

      </div>

      {/* Render the enhanced child component */}
      {renderChildWithProps()}
      
      {error != '' && (
        <div className='form--error'>
          {error}
        </div>
      )}
    </div>
  );
}
