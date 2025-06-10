import React, { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function FileInput({ 
  isFocused = false,
  isDisabled = false, 
  onFileChange,
  className = '',
  previewStyle = '',
  currentPreview = '',
  ...props
}, ref) {
  const input = ref ? ref : useRef();
  const [preview, setPreview] = useState(currentPreview);

  const styleEnable = 'w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter mt-1';
  const styleDisable = 'w-full rounded-lg border-[1.5px] border-stroke outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-2 file:px-4 file:hover:bg-primary file:hover:bg-opacity-10 cursor-default bg-gray-100 text-gray-500 mt-1'

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(file, URL.createObjectURL(file));
    } else {
      onFileChange(null, '');
    }
  };

  const handleClear = () => {
    setPreview('');
    onFileChange(null, ''); // Clear the file data in parent state
    if (input.current) {
      input.current.value = ''; // Reset the file input field
    }
  };

  return (
    <>
      <input
        {...props}
        type='file'
        ref={input}
        onChange={handleChange}
        className={`${(isDisabled ? styleDisable : styleEnable)} ${className}`}
        readOnly={isDisabled}
        disabled={isDisabled}
      />
      {preview && (
        <div className='relative mt-2'>
          <img
            src={preview}
            alt='Preview'
            className={'w-36 h-auto ' + previewStyle}
          />
          <button
            onClick={handleClear}
            type='button'
            className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition'
            title='Delete Preview'
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
});
