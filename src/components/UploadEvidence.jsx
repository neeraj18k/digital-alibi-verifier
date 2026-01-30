import React, { useState } from "react";
import api from "../services/api";

const UploadEvidence = ({ caseId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    await api.post(`/cases/${caseId}/evidence/upload`, formData);
    setLoading(false);
    setFile(null);
    onUpload();
  };

  return (
    <div className="card">
      <h2>📸 Upload Screenshot Evidence</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
    </div>
  );
};

export default UploadEvidence;
