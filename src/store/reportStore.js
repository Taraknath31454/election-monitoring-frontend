import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { REPORT_STATUS, REPORT_SEVERITY, STORAGE_KEYS } from '../constants';

// Initial sample reports data
const initialReports = [
  {
    id: 1,
    title: 'Voting Machine Malfunction',
    description: 'Voting machine at Station 42 was not properly registering votes.',
    category: 'Technical Issue',
    severity: REPORT_SEVERITY.HIGH,
    status: REPORT_STATUS.PENDING,
    location: 'Station 42, District 5',
    dateCreated: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T10:30:00Z',
    assignedTo: null,
    priorityScore: 75,
    comments: [],
    history: [
      { status: REPORT_STATUS.PENDING, timestamp: '2024-01-15T10:30:00Z', note: 'Report created' }
    ]
  },
  {
    id: 2,
    title: 'Suspected Voter Intimidation',
    description: 'Group of individuals intimidating voters near the polling station.',
    category: 'Intimidation',
    severity: REPORT_SEVERITY.CRITICAL,
    status: REPORT_STATUS.UNDER_REVIEW,
    location: 'Station 15, District 2',
    dateCreated: '2024-01-15T09:00:00Z',
    lastUpdated: '2024-01-15T11:00:00Z',
    assignedTo: 3,
    priorityScore: 95,
    comments: [],
    history: [
      { status: REPORT_STATUS.PENDING, timestamp: '2024-01-15T09:00:00Z', note: 'Report created' },
      { status: REPORT_STATUS.UNDER_REVIEW, timestamp: '2024-01-15T11:00:00Z', note: 'Assigned to observer' }
    ]
  },
  {
    id: 3,
    title: 'Missing Voter Registration List',
    description: 'The voter registration list was not available at the polling station.',
    category: 'Documentation Issue',
    severity: REPORT_SEVERITY.MEDIUM,
    status: REPORT_STATUS.RESOLVED,
    location: 'Station 8, District 1',
    dateCreated: '2024-01-14T14:00:00Z',
    lastUpdated: '2024-01-15T09:00:00Z',
    assignedTo: 3,
    priorityScore: 50,
    comments: [],
    history: [
      { status: REPORT_STATUS.PENDING, timestamp: '2024-01-14T14:00:00Z', note: 'Report created' },
      { status: REPORT_STATUS.UNDER_REVIEW, timestamp: '2024-01-14T15:00:00Z', note: 'Assigned to observer' },
      { status: REPORT_STATUS.RESOLVED, timestamp: '2024-01-15T09:00:00Z', note: 'Issue resolved - list was found' }
    ]
  },
  {
    id: 4,
    title: 'Multiple Voting Suspected',
    description: 'Suspected case of individuals voting multiple times.',
    category: 'Fraud',
    severity: REPORT_SEVERITY.CRITICAL,
    status: REPORT_STATUS.PENDING,
    location: 'Station 22, District 7',
    dateCreated: '2024-01-15T12:00:00Z',
    lastUpdated: '2024-01-15T12:00:00Z',
    assignedTo: null,
    priorityScore: 90,
    comments: [],
    history: [
      { status: REPORT_STATUS.PENDING, timestamp: '2024-01-15T12:00:00Z', note: 'Report created' }
    ]
  },
  {
    id: 5,
    title: 'Late Opening of Polling Station',
    description: 'Polling station opened 30 minutes late due to staff shortage.',
    category: 'Voting Irregularity',
    severity: REPORT_SEVERITY.LOW,
    status: REPORT_STATUS.REJECTED,
    location: 'Station 30, District 4',
    dateCreated: '2024-01-15T08:00:00Z',
    lastUpdated: '2024-01-15T10:00:00Z',
    assignedTo: null,
    priorityScore: 25,
    comments: [],
    history: [
      { status: REPORT_STATUS.PENDING, timestamp: '2024-01-15T08:00:00Z', note: 'Report created' },
      { status: REPORT_STATUS.REJECTED, timestamp: '2024-01-15T10:00:00Z', note: 'Not a reportable issue - staff arrived shortly after' }
    ]
  }
];

export const useReportStore = create(
  persist(
    (set, get) => ({
      // State
      reports: initialReports,
      selectedReport: null,
      filters: {
        status: '',
        severity: '',
        category: '',
        search: '',
        dateFrom: '',
        dateTo: ''
      },
      sorting: {
        field: 'dateCreated',
        order: 'desc'
      },
      pagination: {
        page: 1,
        pageSize: 10
      },
      
      // Actions
      addReport: (reportData) => {
        const newReport = {
          ...reportData,
          id: Date.now(),
          dateCreated: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          status: REPORT_STATUS.PENDING,
          comments: [],
          history: [
            { status: REPORT_STATUS.PENDING, timestamp: new Date().toISOString(), note: 'Report created' }
          ]
        };
        
        set(state => ({
          reports: [newReport, ...state.reports]
        }));
        
        return newReport;
      },
      
      updateReport: (reportId, updates) => {
        set(state => ({
          reports: state.reports.map(r => 
            r.id === reportId 
              ? { ...r, ...updates, lastUpdated: new Date().toISOString() } 
              : r
          )
        }));
      },
      
      deleteReport: (reportId) => {
        set(state => ({
          reports: state.reports.filter(r => r.id !== reportId)
        }));
      },
      
      assignReport: (reportId, userId) => {
        const historyEntry = {
          status: get().reports.find(r => r.id === reportId)?.status,
          timestamp: new Date().toISOString(),
          note: `Assigned to user ID: ${userId}`
        };
        
        set(state => ({
          reports: state.reports.map(r => 
            r.id === reportId 
              ? { 
                  ...r, 
                  assignedTo: userId, 
                  lastUpdated: new Date().toISOString(),
                  history: [...r.history, historyEntry]
                } 
              : r
          )
        }));
      },
      
      updateStatus: (reportId, newStatus, note = '') => {
        const historyEntry = {
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note || `Status changed to ${newStatus}`
        };
        
        set(state => ({
          reports: state.reports.map(r => 
            r.id === reportId 
              ? { 
                  ...r, 
                  status: newStatus, 
                  lastUpdated: new Date().toISOString(),
                  history: [...r.history, historyEntry]
                } 
              : r
          )
        }));
      },
      
      addComment: (reportId, comment, userId) => {
        const newComment = {
          id: Date.now(),
          text: comment,
          userId,
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          reports: state.reports.map(r => 
            r.id === reportId 
              ? { 
                  ...r, 
                  comments: [...r.comments, newComment],
                  lastUpdated: new Date().toISOString()
                } 
              : r
          )
        }));
      },
      
      selectReport: (report) => {
        set({ selectedReport: report });
      },
      
      clearSelectedReport: () => {
        set({ selectedReport: null });
      },
      
      setFilters: (filters) => {
        set(state => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 } // Reset to page 1 when filters change
        }));
      },
      
      clearFilters: () => {
        set({
          filters: {
            status: '',
            severity: '',
            category: '',
            search: '',
            dateFrom: '',
            dateTo: ''
          },
          pagination: { page: 1, pageSize: 10 }
        });
      },
      
      setSorting: (field, order) => {
        set({
          sorting: { field, order }
        });
      },
      
      setPagination: (page, pageSize) => {
        set({
          pagination: { page, pageSize }
        });
      },
      
      // Computed getters
      getFilteredReports: () => {
        const { reports, filters, sorting } = get();
        
        let filtered = [...reports];
        
        // Apply filters
        if (filters.status) {
          filtered = filtered.filter(r => r.status === filters.status);
        }
        if (filters.severity) {
          filtered = filtered.filter(r => r.severity === filters.severity);
        }
        if (filters.category) {
          filtered = filtered.filter(r => r.category === filters.category);
        }
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter(r => 
            r.title.toLowerCase().includes(searchLower) ||
            r.description.toLowerCase().includes(searchLower) ||
            r.location.toLowerCase().includes(searchLower)
          );
        }
        if (filters.dateFrom) {
          filtered = filtered.filter(r => new Date(r.dateCreated) >= new Date(filters.dateFrom));
        }
        if (filters.dateTo) {
          filtered = filtered.filter(r => new Date(r.dateCreated) <= new Date(filters.dateTo));
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
          let aVal = a[sorting.field];
          let bVal = b[sorting.field];
          
          if (sorting.field === 'dateCreated' || sorting.field === 'lastUpdated') {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
          }
          
          if (sorting.order === 'asc') {
            return aVal > bVal ? 1 : -1;
          }
          return aVal < bVal ? 1 : -1;
        });
        
        return filtered;
      },
      
      getPaginatedReports: () => {
        const filtered = get().getFilteredReports();
        const { page, pageSize } = get().pagination;
        
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        return filtered.slice(startIndex, endIndex);
      },
      
      getTotalFilteredCount: () => {
        return get().getFilteredReports().length;
      },
      
      getReportsByStatus: () => {
        const reports = get().reports;
        return {
          [REPORT_STATUS.PENDING]: reports.filter(r => r.status === REPORT_STATUS.PENDING).length,
          [REPORT_STATUS.UNDER_REVIEW]: reports.filter(r => r.status === REPORT_STATUS.UNDER_REVIEW).length,
          [REPORT_STATUS.RESOLVED]: reports.filter(r => r.status === REPORT_STATUS.RESOLVED).length,
          [REPORT_STATUS.REJECTED]: reports.filter(r => r.status === REPORT_STATUS.REJECTED).length
        };
      },
      
      getReportsBySeverity: () => {
        const reports = get().reports;
        return {
          [REPORT_SEVERITY.LOW]: reports.filter(r => r.severity === REPORT_SEVERITY.LOW).length,
          [REPORT_SEVERITY.MEDIUM]: reports.filter(r => r.severity === REPORT_SEVERITY.MEDIUM).length,
          [REPORT_SEVERITY.HIGH]: reports.filter(r => r.severity === REPORT_SEVERITY.HIGH).length,
          [REPORT_SEVERITY.CRITICAL]: reports.filter(r => r.severity === REPORT_SEVERITY.CRITICAL).length
        };
      },
      
      getReportsByCategory: () => {
        const reports = get().reports;
        const categories = {};
        
        reports.forEach(r => {
          categories[r.category] = (categories[r.category] || 0) + 1;
        });
        
        return categories;
      },
      
      getReportsByMonth: () => {
        const reports = get().reports;
        const months = {};
        
        reports.forEach(r => {
          const month = new Date(r.dateCreated).toLocaleString('default', { month: 'short' });
          months[month] = (months[month] || 0) + 1;
        });
        
        return months;
      },
      
      getAssignedReports: (userId) => {
        return get().reports.filter(r => r.assignedTo === userId);
      }
    }),
    {
      name: STORAGE_KEYS.REPORTS,
      partialize: (state) => ({ reports: state.reports })
    }
  )
);
