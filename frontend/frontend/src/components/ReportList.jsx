import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reports');
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>All Saved Reports</h2>
      {reports.map((report, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Category:</strong> {report.category}</p>
          <p><strong>Doctor:</strong> {report.doctor}</p>
          <p><strong>Hospital:</strong> {report.hospital}</p>
          <p><strong>Summary:</strong> {report.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
