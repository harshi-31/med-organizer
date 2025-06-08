import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';
import { ReportProvider } from './context/ReportContext';

function App() {
  return (
      <div style={{ padding: '20px' }}>
        <h1>Medical Report Organizer</h1>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/reports" element={<ReportList />} />
        </Routes>
      </div>
  );
}


export default App;
