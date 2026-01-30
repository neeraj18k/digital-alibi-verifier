import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import api from "../services/api";
import "../styles/report.css";

const CaseReport = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const [caseRes, timelineRes, verdictRes] = await Promise.all([
        api.get(`/cases/${id}`),
        api.get(`/cases/${id}/timeline`),
        api.get(`/cases/${id}/verdict`)
      ]);

      setCaseData(caseRes.data);
      setTimeline(timelineRes.data);
      setVerdict(verdictRes.data);
    };

    fetchReport();
  }, [id]);

  if (!caseData) return null;

  const screenshots = timeline.filter(e => e.type === "screenshot");
  const locations = timeline.filter(e => e.type === "location_clue");
  const networks = timeline.filter(e => e.type === "network");

  return (
    <>
      <ThreeBackground />
      <Navbar />

      <div className="report-container">

        <h1 className="report-title">📄 Digital Alibi Investigation Report</h1>

        {/* Case Summary */}
        <div className="report-card">
          <h2>📝 Case Summary</h2>
          <p><strong>Claim:</strong> {caseData.claim}</p>
          <p>
            <strong>Claimed Time:</strong>{" "}
            {new Date(caseData.timeRange.start).toLocaleString()} —{" "}
            {new Date(caseData.timeRange.end).toLocaleString()}
          </p>
        </div>

        {/* Evidence Stats */}
        <div className="report-card">
          <h2>📊 Evidence Summary</h2>
          <ul>
            <li>📸 Screenshots analyzed: {screenshots.length}</li>
            <li>📍 Locations extracted: {locations.length}</li>
            <li>🌐 Network activities recorded: {networks.length}</li>
          </ul>
        </div>

        {/* Timeline */}
        <div className="report-card">
          <h2>🕒 Digital Activity Timeline</h2>
          {timeline.map(e => (
            <div key={e._id} className="report-timeline-item">
              <span>{new Date(e.timestamp).toLocaleString()}</span>
              <b>{e.type.toUpperCase()}</b>
            </div>
          ))}
        </div>

        {/* Evidence Gallery */}
        <div className="report-card">
          <h2>🖼 Evidence Gallery</h2>
          <div className="report-gallery">
            {screenshots.map(e => (
              <img
                key={e._id}
                src={`http://localhost:5000${e.data.fileUrl}`}
                alt="evidence"
              />
            ))}
          </div>
        </div>

        {/* Verdict */}
        {verdict && (
          <div className={`report-verdict ${verdict.result === "TRUE" ? "true" : "false"}`}>
            <h1>
              {verdict.result === "TRUE" ? "ALIBI VERIFIED" : "ALIBI DISPROVED"}
            </h1>
            <p>{verdict.reason}</p>
            <span>Confidence Score: {verdict.confidence}%</span>
          </div>
        )}

      </div>
    </>
  );
};

export default CaseReport;
