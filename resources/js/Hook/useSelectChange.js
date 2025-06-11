/**
 * Custom hook for handling basic select field changes
 * 
 * @param {Object} initialData - Initial form data
 * @param {Function} setData - State setter function for form data
 * @returns {Object} Object containing handler functions
 */
export const useSelectChange = (initialData, setData) => {
  /**
   * Generic handler for simple select changes
   * 
   * @param {string} fieldName - Name of the field in the data state
   * @param {Object} option - Selected option object (with value and label properties)
   * @param {Object} additionalUpdates - Additional state updates to apply
   */
  const handleSelectChange = (fieldName, option, additionalUpdates = {}) => {
    setData((prevData) => {
      // Use initialData as fallback if the field doesn't exist in prevData
      const baseData = prevData || initialData || {};
      
      return {
        ...baseData,
        [fieldName]: option.value,
        [`${fieldName}Selected`]: option,
        ...additionalUpdates
      };
    });
  };
  
  return {
    handleSelectChange
  };
};

export default useSelectChange;