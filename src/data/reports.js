const savedReports = JSON.parse(localStorage.getItem("reports")) || [];

export const reports = savedReports;
