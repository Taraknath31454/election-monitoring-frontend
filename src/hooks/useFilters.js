import { useState, useCallback, useMemo } from 'react';

/**
 * useFilters Hook
 * Provides filter functionality for lists/tables
 * @param {object} initialFilters - Initial filter values
 * @returns {object} Filter methods and state
 */
export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  // Update single filter
  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Update multiple filters at once
  const setMultipleFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear single filter
  const clearFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => value !== '' && value !== null && value !== undefined) || 
           searchQuery !== '';
  }, [filters, searchQuery]);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.values(filters).forEach(value => {
      if (value !== '' && value !== null && value !== undefined) {
        count++;
      }
    });
    if (searchQuery) count++;
    return count;
  }, [filters, searchQuery]);

  // Filter data array
  const applyFilters = useCallback((data, filterConfig = {}) => {
    let filtered = [...data];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = filterConfig.searchFields || ['title', 'description'];
      
      filtered = filtered.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        const config = filterConfig[key];
        
        if (config) {
          // Custom filter configuration
          if (config.type === 'range') {
            filtered = filtered.filter(item => {
              const itemValue = item[key];
              return itemValue >= value.min && itemValue <= value.max;
            });
          } else if (config.type === 'date') {
            filtered = filtered.filter(item => {
              const itemDate = new Date(item[key]);
              const fromDate = value.from ? new Date(value.from) : null;
              const toDate = value.to ? new Date(value.to) : null;
              
              if (fromDate && itemDate < fromDate) return false;
              if (toDate && itemDate > toDate) return false;
              return true;
            });
          } else if (config.type === 'array') {
            filtered = filtered.filter(item => 
              config.values.includes(item[key])
            );
          } else if (config.transform) {
            // Custom transform function
            filtered = filtered.filter(item => 
              config.transform(item[key]) === config.transform(value)
            );
          } else {
            // Default exact match
            filtered = filtered.filter(item => item[key] === value);
          }
        } else {
          // Default exact match
          filtered = filtered.filter(item => item[key] === value);
        }
      }
    });

    return filtered;
  }, [filters, searchQuery]);

  return {
    // State
    filters,
    searchQuery,
    hasActiveFilters,
    activeFilterCount,
    
    // Actions
    setFilter,
    setMultipleFilters,
    clearFilter,
    clearAllFilters,
    setSearchQuery,
    
    // Utility
    applyFilters
  };
}

export default useFilters;
