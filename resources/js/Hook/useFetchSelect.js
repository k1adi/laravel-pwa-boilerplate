import { useState } from 'react';
import useSelectChange from './useSelectChange';

/**
 * Custom hook for handling select fields that need to fetch dependent data
 * 
 * @param {Object} initialData - Initial form data
 * @param {Function} setData - State setter function for form data
 * @returns {Object} Object containing handler functions and loading states
 */
export const useFetchSelect = (initialData, setData) => {
  // Get the basic select change handler
  const { handleSelectChange } = useSelectChange(initialData, setData);
  
  // State for loading indicators
  const [loadingStates, setLoadingStates] = useState({});

  /**
   * Handler for selects that need to fetch dependent data
   * 
   * @param {string} fieldName - Name of the field in the data state
   * @param {Object} option - Selected option object (with value and label properties)
   * @param {Object} fetchConfig - Configuration for the fetch operation
   * @param {Function} dependentStateUpdater - Function to update dependent state (e.g., setContacts)
   * @param {Object} additionalUpdates - Additional state updates to apply
   */
  const handleSelectWithFetch = async (
    fieldName,
    option,
    fetchConfig,
    dependentStateUpdater,
    additionalUpdates = {}
  ) => {
    // Update the primary selection state
    handleSelectChange(fieldName, option, additionalUpdates);
    
    // Set loading state for the dependent data
    setLoadingStates(prev => ({ ...prev, [fetchConfig.loadingStateKey]: true }));
    
    // Show loading state in the dependent dropdown
    if (dependentStateUpdater) {
      dependentStateUpdater([{ id: '', name: 'Loading...' }]);
    }

    try {
      // Prepare fetch parameters
      const { url, paramName, paramValue = option.value, method = 'get' } = fetchConfig;
      
      // Construct params object
      const params = { [paramName]: paramValue };
      
      // Make the API request using native fetch
      let response;
      
      if (method.toLowerCase() === 'get') {
        // For GET requests, add params to the URL
        const searchParams = new URLSearchParams();
        searchParams.append(paramName, paramValue);
        
        response = await fetch(`${url}?${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'same-origin'
        });
      } else {
        // For POST/PUT/etc requests
        response = await fetch(url, {
          method: method.toUpperCase(),
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
          },
          body: JSON.stringify(params),
          credentials: 'same-origin'
        });
      }
      
      // Handle response
      if (response.ok) {
        const data = await response.json();
        
        // Update dependent data state if provided
        if (dependentStateUpdater) {
          dependentStateUpdater(data);
        }
        
        // Call success callback if provided
        if (fetchConfig.onSuccess) {
          fetchConfig.onSuccess(data);
        }
      } else {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(
        `Error during ${fieldName} change:`, 
        error.message || 'An unexpected error occurred'
      );
      
      // Call error callback if provided
      if (fetchConfig.onError) {
        fetchConfig.onError(error);
      }
      
      // Reset dependent dropdown to show error
      if (dependentStateUpdater) {
        dependentStateUpdater([{ id: '', name: 'Error loading data' }]);
      }
    } finally {
      // Clear loading state
      setLoadingStates(prev => ({ ...prev, [fetchConfig.loadingStateKey]: false }));
    }
  };

  return {
    handleSelectChange,
    handleSelectWithFetch,
    loadingStates
  };
};

export default useFetchSelect;