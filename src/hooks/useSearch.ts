import {useState, useEffect, useCallback} from 'react';

const useSearch = <F>(initialValue: F, delay = 500) => {
  const [query, setQuery] = useState<F>(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState<F>(initialValue);

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

  const clearQuery = useCallback(() => setQuery(initialValue), [initialValue]);

  return {
    query,
    debouncedQuery, // This will be updated after the debounce delay
    updateQuery,
    clearQuery,
  };
};

export default useSearch;
