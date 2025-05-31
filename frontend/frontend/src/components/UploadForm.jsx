import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [category, setCategory] = useState('');


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
    </div>
  );

};

export default UploadForm;
