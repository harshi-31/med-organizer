import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ReportContext } from '../context/ReportContext';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [category, setCategory] = useState('');
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor]=useState('');
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
      setExtractedText(response.data.extracted_text);
      setCategory(response.data.category);
      setHospital(response.data.hospital); 
      setDoctor(response.data.doctor); 
      setDate(response.data.date);
      setSummary(response.data.summary);

       /*await axios.post('http://localhost:8000/save-report', {
        extracted_text,
        category,
        hospital,
        doctor,
        date,
        summary,
      });*/

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
      {category && (
        <div>
          <h3>Category: {category}</h3>
        </div>
      )}
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
