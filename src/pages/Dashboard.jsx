import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import api from "../services/api";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await api.get("/cases");
      setCases(res.data || []);
    } catch (err) {
      console.error("Failed to fetch cases", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThreeBackground />
      <Navbar />

      <div className="dashboard-wrapper modern">
        <div className="dashboard-header">
          <h1>Investigation Dashboard</h1>
          <p>Track digital evidence and verify alibis</p>
        </div>

        <button
          className="create-case-btn"
          onClick={() => navigate("/create-case")}
        >
          + Start New Investigation
        </button>

        <div className="case-section">
          {loading ? (
            <p className="empty">Loading investigations...</p>
          ) : cases.length === 0 ? (
            <p className="empty">No investigations yet.</p>
          ) : (
            cases.map((c) => (
              <div
                key={c._id}
                className="case-card modern-card"
                onClick={() => navigate(`/case/${c._id}`)}
              >
                <div>
                  <h3>{c.claim}</h3>
                  <span>
                    Created {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="arrow">→</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
