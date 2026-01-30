import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import UploadEvidence from "../components/UploadEvidence";
import Timeline from "../components/Timeline";
import EvidenceGallery from "../components/EvidenceGallery";
import VerdictCard from "../components/VerdictCard";
import SystemLogs from "../components/SystemLogs";
import api from "../services/api";
import "../styles/caseDetails.css";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [caseRes, timelineRes, verdictRes] = await Promise.all([
        api.get(`/cases/${id}`),
        api.get(`/cases/${id}/timeline`),
        api.get(`/cases/${id}/verdict`)
      ]);

      setCaseData(caseRes.data);
      setTimeline(timelineRes.data);
      setVerdict(verdictRes.data);
    } catch (err) {
      console.error("Error loading case:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshAfterUpload = () => {
    setRefreshing(true);
    setTimeout(fetchData, 2000); // give backend time to process Kafka events
  };

  if (loading) return <div className="loader">Loading investigation...</div>;
  if (!caseData) return <div className="error">Case not found.</div>;

  return (
    <>
      <ThreeBackground />
      <Navbar />

      <div className="case-container modern">
        <h1 className="title">Investigation Details</h1>

        {/* CLAIM INFO */}
        <div className="card">
          <h2>📝 Claim Statement</h2>
          <p className="claim-text">{caseData.claim}</p>
        </div>

        <div className="card">
          <h2>⏳ Claimed Time Period</h2>
          <p>
            {new Date(caseData.timeRange.start).toLocaleString()} —{" "}
            {new Date(caseData.timeRange.end).toLocaleString()}
          </p>
        </div>

        {/* EVIDENCE UPLOAD */}
        <UploadEvidence caseId={id} onUpload={refreshAfterUpload} />

        {refreshing && (
          <div className="card processing-card">
            🔍 Analyzing evidence... extracting timestamps, locations & activity...
          </div>
        )}

        {/* EVIDENCE GALLERY */}
        <EvidenceGallery events={timeline} />

        {/* TIMELINE */}
        <Timeline events={timeline} />

        {/* SYSTEM LOGS */}
        <SystemLogs caseId={id} />

        {/* FINAL VERDICT */}
        <VerdictCard verdict={verdict} />

        {/* GO TO FULL REPORT */}
        <button
          className="email-btn"
          onClick={() => navigate(`/case/${id}/report`)}
        >
          📄 View Full Investigation Report
        </button>
      </div>
    </>
  );
};

export default CaseDetails;
