import React, { createContext, useState } from 'react';

export const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    setReports(prev => Array.isArray(report) ? [...prev, ...report] : [...prev, report]);
  };

  const clearReports = () => {
    setReports([]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport, clearReports }}>
      {children}
    </ReportContext.Provider>
  );
};
