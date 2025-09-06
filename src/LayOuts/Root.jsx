// src/LayOuts/Root.jsx
import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import { useAuth } from "../contexts/AuthContext";

const Root = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Don't show Navbar for dashboard or feed pages (they have their own headers)
  const hideNavbar = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/feed');
  
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 fakebook-grid">
      {!hideNavbar && <Navbar />}
      <Outlet />
      <div className="fakebook-vignette" />
    </div>
  );
};

export default Root;