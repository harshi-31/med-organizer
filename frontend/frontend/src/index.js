import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReportProvider } from './context/ReportContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReportProvider>
        <App />
      </ReportProvider>
    </BrowserRouter>
  </React.StrictMode>
);
