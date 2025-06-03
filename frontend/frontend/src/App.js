

// App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/reports" element={<ReportList />} />
      </Routes>
    </Router>
  );
}

export default App;*/


import React from 'react';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';

const App = () => {
  return (
    <div>
      <h1>Medical Report Organizer</h1>
      <UploadForm />
      <ReportList />
    </div>
  );
};

export default App;
