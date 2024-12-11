import {useState, useEffect, useCallback} from 'react';

const useSearch = <F>(delay = 800) => {
  const [query, setQuery] = useState<F | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState<F | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  const updateQuery = useCallback((searchValue: F) => {
    setQuery(searchValue); // Update query immediately
  }, []);

  const clearQuery = useCallback(() => setQuery(null), []);

  return {
    query,
    debouncedQuery, // This will be updated after the debounce delay
    updateQuery,
    clearQuery,
  };
};

export default useSearch;
