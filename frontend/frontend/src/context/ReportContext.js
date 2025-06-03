import React, { createContext, useState } from 'react';

export const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    setReports((prev) => [...prev, report]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
};
