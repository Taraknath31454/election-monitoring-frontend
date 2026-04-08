import { useCallback, useMemo } from 'react';
import { useReportStore } from '../store/reportStore';

/**
 * useReports Hook
 * Provides report management functionality
 * @returns {object} Report methods and state
 */
export function useReports() {
  const {
    reports,
    selectedReport,
    filters,
    sorting,
    pagination,
    addReport,
    updateReport,
    deleteReport,
    assignReport,
    updateStatus,
    addComment,
    selectReport,
    clearSelectedReport,
    setFilters,
    clearFilters,
    setSorting,
    setPagination,
    getFilteredReports,
    getPaginatedReports,
    getTotalFilteredCount,
    getReportsByStatus,
    getReportsBySeverity,
    getReportsByCategory,
    getAssignedReports
  } = useReportStore();

  // Memoized filtered reports
  const filteredReports = useMemo(() => {
    return getFilteredReports();
  }, [getFilteredReports, reports, filters, sorting]);

  // Memoized paginated reports
  const paginatedReports = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredReports.slice(start, start + pagination.pageSize);
  }, [filteredReports, pagination.page, pagination.pageSize]);

  // Memoized total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredReports.length / pagination.pageSize);
  }, [filteredReports.length, pagination.pageSize]);

  // Create new report
  const createReport = useCallback((reportData) => {
    return addReport(reportData);
  }, [addReport]);

  // Update existing report
  const editReport = useCallback((reportId, updates) => {
    updateReport(reportId, updates);
  }, [updateReport]);

  // Remove report
  const removeReport = useCallback((reportId) => {
    deleteReport(reportId);
  }, [deleteReport]);

  // Change report status
  const changeStatus = useCallback((reportId, newStatus, note) => {
    updateStatus(reportId, newStatus, note);
  }, [updateStatus]);

  // Assign report to user
  const assignToUser = useCallback((reportId, userId) => {
    assignReport(reportId, userId);
  }, [assignReport]);

  // Add comment to report
  const comment = useCallback((reportId, commentText, userId) => {
    addComment(reportId, commentText, userId);
  }, [addComment]);

  // Reset pagination when filters change
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, [setFilters]);

  const handlePageChange = useCallback((newPage) => {
    setPagination(newPage, pagination.pageSize);
  }, [setPagination, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPagination(1, newPageSize);
  }, [setPagination]);

  return {
    // State
    reports,
    filteredReports,
    paginatedReports,
    selectedReport,
    filters,
    sorting,
    pagination,
    totalFilteredCount: filteredReports.length,
    totalPages,
    
    // Actions
    createReport,
    editReport,
    removeReport,
    changeStatus,
    assignToUser,
    comment,
    selectReport,
    clearSelectedReport,
    
    // Filters
    setFilters,
    clearFilters,
    handleFilterChange,
    
    // Sorting
    setSorting,
    
    // Pagination
    setPagination,
    handlePageChange,
    handlePageSizeChange,
    
    // Computed
    getReportsByStatus,
    getReportsBySeverity,
    getReportsByCategory,
    getAssignedReports
  };
}

export default useReports;
