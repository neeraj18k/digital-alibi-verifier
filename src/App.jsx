import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CaseDetails from "./pages/CaseDetails";
import CreateCase from "./pages/CreateCase";
import ProtectedRoute from "./components/ProtectedRoute";
import CaseReport from "./pages/CaseReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/case/:id/report" element={<CaseReport />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-case"
          element={
            <ProtectedRoute>
              <CreateCase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/case/:id"
          element={
            <ProtectedRoute>
              <CaseDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
