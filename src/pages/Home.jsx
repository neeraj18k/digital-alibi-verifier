import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container modern-home">
      <Navbar />

      <div className="hero-section">
        <h1>
          Digital <span>Alibi Verification</span>
        </h1>
        <p>
          Reconstruct timelines. Analyze activity. Verify the truth with AI-powered digital forensics.
        </p>

        <div className="hero-buttons">
          <a href="/login" className="btn primary">Start Investigation</a>
          <a href="/signup" className="btn secondary">Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
