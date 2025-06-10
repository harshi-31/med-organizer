import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { ReportContext } from '../context/ReportContext';

const ReportList = () => {
  const { reports, addReport, clearReports } = useContext(ReportContext);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reports');
        addReport(response.data); // handles array
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  const handleClearReports = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all reports?");
    if (!confirmed) return;

    try {
      const response = await axios.delete('http://localhost:8000/reports/clear');

      if (response.status === 200) {
        alert("All reports deleted.");
        clearReports(); // ✅ use context method to clear state
      } else {
        alert("Failed to delete reports.");
      }
    } catch (err) {
      console.error("Error clearing reports:", err);
      alert("Error clearing reports.");
    }
  };

  return (
    <div>
      <h2>All Saved Reports</h2>

      <button
        onClick={handleClearReports}
        style={{
          marginBottom: 20,
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Clear All Reports
      </button>

      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>Date:</strong> {report.date}</p>
            <p><strong>Category:</strong> {report.category}</p>
            <p><strong>Doctor:</strong> {report.doctor}</p>
            <p><strong>Hospital:</strong> {report.hospital}</p>
            <p><strong>Summary:</strong> {report.summary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
