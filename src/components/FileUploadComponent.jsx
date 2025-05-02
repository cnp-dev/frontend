import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const backendUrl = 'https://backend-xthc.onrender.com';

  const uploadFile = async () => {
    if (!file) return alert("Choose a file first!");
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${backendUrl}/upload`, formData);
      setFile(null);
      fetchFiles();
    } catch (error) {
      alert("Upload failed!");
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${backendUrl}/files`);
      setFiles(res.data);
    } catch (error) {
      alert("Failed to fetch files.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container p-4">
      <h2 className="mb-3">📁 Public File Upload</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button className="btn btn-primary mt-2" onClick={uploadFile}>Upload</button>

      <h4 className="mt-4">Stored Files:</h4>
      <ul className="list-group">
        {files.map(f => (
          <li key={f._id} className="list-group-item d-flex justify-content-between">
            {f.filename}
            <a href={`${backendUrl}/files/${f.filename}`} target="_blank" rel="noopener noreferrer">
              View / Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadComponent;
