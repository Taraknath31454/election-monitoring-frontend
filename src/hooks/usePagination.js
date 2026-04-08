import { useState, useCallback, useMemo } from 'react';
import { PAGINATION } from '../constants';

/**
 * usePagination Hook
 * Provides pagination functionality
 * @param {number} totalItems - Total number of items
 * @param {number} initialPage - Initial page number
 * @param {number} initialPageSize - Initial page size
 * @returns {object} Pagination methods and state
 */
export function usePagination(totalItems = 0, initialPage = 1, initialPageSize = PAGINATION.DEFAULT_PAGE_SIZE) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  // Calculate start and end indices
  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize, totalItems);
  }, [startIndex, pageSize, totalItems]);

  // Go to specific page
  const goToPage = useCallback((page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  // Go to next page
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  // Go to previous page
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Change page size
  const changePageSize = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Reset pagination
  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Check if there are next/previous pages
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  // Generate page numbers for display
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return {
    // State
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
    
    // Navigation
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    reset,
    
    // Helpers
    canGoNext,
    canGoPrev,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    
    // Page range for display
    pageRange: `${startIndex + 1}-${endIndex} of ${totalItems}`
  };
}

export default usePagination;
