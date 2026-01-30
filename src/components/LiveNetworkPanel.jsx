import React, { useState, useEffect } from "react";
import api from "../services/api";

const LiveNetworkPanel = ({ caseId, onUpdate }) => {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        api.post(`/cases/${caseId}/network/log`);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [running, caseId]);

  return (
    <div className="upload-box">
      <h3>🌐 Live Network Monitor</h3>
      <p>Tracks real-time internet usage</p>

      {!running ? (
        <button onClick={() => setRunning(true)}>Start Monitoring</button>
      ) : (
        <button onClick={() => setRunning(false)} style={{ background: "red", color: "white" }}>
          Stop Monitoring
        </button>
      )}
    </div>
  );
};

export default LiveNetworkPanel;
