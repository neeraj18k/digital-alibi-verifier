import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/systemLogs.css";

const SystemLogs = ({ caseId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`/cases/${caseId}/logs`)
      .then(res => setLogs(res.data))
      .catch(() => console.log("No logs yet"));
  }, [caseId]);

  return (
    <div className="card logs-card">
      <h2>Investigation Activity</h2>

      {logs.length === 0 ? (
        <p className="empty">No system activity yet</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} className={`log-item ${log.level}`}>
            <span>{new Date(log.createdAt).toLocaleString()}</span>
            <p>{log.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SystemLogs;
