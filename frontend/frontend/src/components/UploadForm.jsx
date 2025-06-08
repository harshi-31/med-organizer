import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReportContext } from '../context/ReportContext';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [category, setCategory] = useState('');
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const { addReport } = useContext(ReportContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData);

      const { extracted_text, category, hospital, doctor, date, summary } = response.data;

      // Set local state for display
      setExtractedText(extracted_text);
      setCategory(category);
      setHospital(hospital);
      setDoctor(doctor);
      setDate(date);
      setSummary(summary);

      // Add report to context
      const newReport = {
        extracted_text,
        category,
        hospital,
        doctor,
        date,
        summary
      };
      addReport(newReport);

      // Navigate to reports page
      navigate('/reports');

    } catch (err) {
      alert("Error uploading file");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Medical Report</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{extractedText}</pre>
        </div>
      )}
      {category && <p><strong>Category:</strong> {category}</p>}
      {hospital && <p><strong>Hospital:</strong> {hospital}</p>}
      {doctor && <p><strong>Doctor:</strong> {doctor}</p>}
      {date && <p><strong>Date:</strong> {date}</p>}
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
