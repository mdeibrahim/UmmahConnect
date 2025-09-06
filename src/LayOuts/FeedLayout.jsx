// src/LayOuts/FeedLayout.jsx
import { Outlet } from "react-router";
import { FeedProvider } from "../contexts/FeedContext";
import Navbar from "../Components/Navbar";

const FeedLayout = () => {
  return (
    <FeedProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 fakebook-grid">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
        <div className="fakebook-vignette" />
      </div>
    </FeedProvider>
  );
};

export default FeedLayout;