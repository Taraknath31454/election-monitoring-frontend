import { REPORT_STATUS, REPORT_SEVERITY, STORAGE_KEYS } from '../constants';

// Get API delay from environment or default
const API_DELAY = parseInt(import.meta.env.VITE_API_DELAY) || 500;

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

/**
 * Simulates API call delay
 * @param {number} duration - Delay in milliseconds
 */
const delay = (duration = API_DELAY) => new Promise(resolve => setTimeout(resolve, duration));

/**
 * Get reports from localStorage or use initial data
 */
const getReports = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return stored ? JSON.parse(stored) : initialReports;
  } catch {
    return initialReports;
  }
};

/**
 * Save reports to localStorage
 */
const saveReports = (reports) => {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
};

/**
 * ReportService - Simulates backend report operations
 */
export const reportService = {
  /**
   * Get all reports
   * @returns {Promise<{success: boolean, reports: array}>}
   */
  getAll: async () => {
    await delay();
    const reports = getReports();
    return { success: true, reports };
  },

  /**
   * Get report by ID
   * @param {number} reportId - Report ID
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  getById: async (reportId) => {
    await delay();
    const reports = getReports();
    const report = reports.find(r => r.id === reportId);
    
    if (!report) {
      return { success: false, error: 'Report not found' };
    }
    
    return { success: true, report };
  },

  /**
   * Create a new report
   * @param {object} reportData - Report data
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  create: async (reportData) => {
    await delay();
    const reports = getReports();
    
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
    
    reports.unshift(newReport);
    saveReports(reports);
    
    return { success: true, report: newReport };
  },

  /**
   * Update a report
   * @param {number} reportId - Report ID
   * @param {object} updates - Fields to update
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  update: async (reportId, updates) => {
    await delay();
    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === reportId);
    
    if (reportIndex === -1) {
      return { success: false, error: 'Report not found' };
    }
    
    reports[reportIndex] = {
      ...reports[reportIndex],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    saveReports(reports);
    
    return { success: true, report: reports[reportIndex] };
  },

  /**
   * Delete a report
   * @param {number} reportId - Report ID
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  delete: async (reportId) => {
    await delay();
    const reports = getReports();
    const filteredReports = reports.filter(r => r.id !== reportId);
    
    if (filteredReports.length === reports.length) {
      return { success: false, error: 'Report not found' };
    }
    
    saveReports(filteredReports);
    return { success: true };
  },

  /**
   * Assign report to a user
   * @param {number} reportId - Report ID
   * @param {number} userId - User ID to assign to
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  assign: async (reportId, userId) => {
    await delay();
    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === reportId);
    
    if (reportIndex === -1) {
      return { success: false, error: 'Report not found' };
    }
    
    const historyEntry = {
      status: reports[reportIndex].status,
      timestamp: new Date().toISOString(),
      note: `Assigned to user ID: ${userId}`
    };
    
    reports[reportIndex] = {
      ...reports[reportIndex],
      assignedTo: userId,
      lastUpdated: new Date().toISOString(),
      history: [...reports[reportIndex].history, historyEntry]
    };
    
    saveReports(reports);
    
    return { success: true, report: reports[reportIndex] };
  },

  /**
   * Update report status
   * @param {number} reportId - Report ID
   * @param {string} newStatus - New status
   * @param {string} note - Optional note
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  updateStatus: async (reportId, newStatus, note = '') => {
    await delay();
    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === reportId);
    
    if (reportIndex === -1) {
      return { success: false, error: 'Report not found' };
    }
    
    const historyEntry = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: note || `Status changed to ${newStatus}`
    };
    
    reports[reportIndex] = {
      ...reports[reportIndex],
      status: newStatus,
      lastUpdated: new Date().toISOString(),
      history: [...reports[reportIndex].history, historyEntry]
    };
    
    saveReports(reports);
    
    return { success: true, report: reports[reportIndex] };
  },

  /**
   * Add comment to report
   * @param {number} reportId - Report ID
   * @param {string} comment - Comment text
   * @param {number} userId - User ID
   * @returns {Promise<{success: boolean, report?: object, error?: string}>}
   */
  addComment: async (reportId, comment, userId) => {
    await delay();
    const reports = getReports();
    const reportIndex = reports.findIndex(r => r.id === reportId);
    
    if (reportIndex === -1) {
      return { success: false, error: 'Report not found' };
    }
    
    const newComment = {
      id: Date.now(),
      text: comment,
      userId,
      timestamp: new Date().toISOString()
    };
    
    reports[reportIndex] = {
      ...reports[reportIndex],
      comments: [...reports[reportIndex].comments, newComment],
      lastUpdated: new Date().toISOString()
    };
    
    saveReports(reports);
    
    return { success: true, report: reports[reportIndex] };
  },

  /**
   * Get reports by status
   * @returns {Promise<{success: boolean, data: object}>}
   */
  getByStatus: async () => {
    await delay();
    const reports = getReports();
    const data = {
      [REPORT_STATUS.PENDING]: reports.filter(r => r.status === REPORT_STATUS.PENDING).length,
      [REPORT_STATUS.UNDER_REVIEW]: reports.filter(r => r.status === REPORT_STATUS.UNDER_REVIEW).length,
      [REPORT_STATUS.RESOLVED]: reports.filter(r => r.status === REPORT_STATUS.RESOLVED).length,
      [REPORT_STATUS.REJECTED]: reports.filter(r => r.status === REPORT_STATUS.REJECTED).length
    };
    
    return { success: true, data };
  },

  /**
   * Get reports by severity
   * @returns {Promise<{success: boolean, data: object}>}
   */
  getBySeverity: async () => {
    await delay();
    const reports = getReports();
    const data = {
      [REPORT_SEVERITY.LOW]: reports.filter(r => r.severity === REPORT_SEVERITY.LOW).length,
      [REPORT_SEVERITY.MEDIUM]: reports.filter(r => r.severity === REPORT_SEVERITY.MEDIUM).length,
      [REPORT_SEVERITY.HIGH]: reports.filter(r => r.severity === REPORT_SEVERITY.HIGH).length,
      [REPORT_SEVERITY.CRITICAL]: reports.filter(r => r.severity === REPORT_SEVERITY.CRITICAL).length
    };
    
    return { success: true, data };
  },

  /**
   * Get reports assigned to user
   * @param {number} userId - User ID
   * @returns {Promise<{success: boolean, reports: array}>}
   */
  getAssignedToUser: async (userId) => {
    await delay();
    const reports = getReports();
    const filtered = reports.filter(r => r.assignedTo === userId);
    
    return { success: true, reports: filtered };
  },

  /**
   * Filter reports
   * @param {object} filters - Filter criteria
   * @returns {Promise<{success: boolean, reports: array}>}
   */
  filter: async (filters) => {
    await delay();
    let reports = getReports();
    
    if (filters.status) {
      reports = reports.filter(r => r.status === filters.status);
    }
    if (filters.severity) {
      reports = reports.filter(r => r.severity === filters.severity);
    }
    if (filters.category) {
      reports = reports.filter(r => r.category === filters.category);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      reports = reports.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.location.toLowerCase().includes(searchLower)
      );
    }
    if (filters.dateFrom) {
      reports = reports.filter(r => new Date(r.dateCreated) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      reports = reports.filter(r => new Date(r.dateCreated) <= new Date(filters.dateTo));
    }
    
    return { success: true, reports };
  }
};

export default reportService;
