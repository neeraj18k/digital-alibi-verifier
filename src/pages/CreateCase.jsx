import React, { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import "../styles/createcase.css";

const CreateCase = () => {
  const [claim, setClaim] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!claim || !start || !end) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/cases/create", {
        claim,
        timeRange: {
          start: new Date(start),
          end: new Date(end),
        },
      });

      alert("Case created successfully 🚀");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThreeBackground />
      <Navbar />

      <div className="create-case-page">
        <div className="create-card">
          <h1>Create Investigation</h1>

          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Claim (e.g. I was sleeping)"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
            />

            <label>Start Time</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Case"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCase;
