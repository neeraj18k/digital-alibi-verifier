import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="nav">
      <div className="logo orbitron">DIGITAL ALIBI</div>

      <div className="links">
        <Link to="/">Home</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
      </div>

      <div className="actions">
        {!token ? (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/signup" className="btn glow">Signup</Link>
          </>
        ) : (
          <button
            className="btn glow"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
