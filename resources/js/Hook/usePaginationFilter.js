import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

const usePaginationFilter = ({ routeName }) => {
  const { search } = usePage().props; // Get query parameters from the page props
  const [querySearch, setQuerySearch] = useState(search || ''); // Initialize state with the query string
  const [currentPage, setCurrentPage] = useState(1); // Default page is 1

  // Update state when query parameters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuerySearch(params.get('search') || '');
    setCurrentPage(parseInt(params.get('page') || '1', 10));
  }, [search]);

  const handleQueryChange = (query) => {
    setQuerySearch(query || '');
    handleFilter({ search: query || '', page: 1 }); // Reset to page 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page || 1);
    handleFilter({ search: querySearch || '', page: page || 1 });
  };

  const handleFilter = ({ search = '', page = 1 }) => {
    if (!routeName) {
      console.error('Route name is undefined.');
      return;
    }

    router.get(
      route(routeName),
      { search, page },
      { replace: true }
    );
  };

  return {
    querySearch,
    currentPage,
    handleQueryChange,
    handlePageChange,
  };
};

export default usePaginationFilter;
