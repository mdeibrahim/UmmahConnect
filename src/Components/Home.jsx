// src/Components/Home.jsx
import { FiImage, FiVideo, FiHeart, FiMessageCircle, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 fakebook-grid">
      <div className="fakebook-vignette" />

      <main className="relative z-10 container mx-auto px-6 py-24 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_60px_rgba(127,255,212,0.15)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/55 backdrop-blur-xl border border-white/10 px-8 py-12 md:px-12 md:py-16">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-slate-300/90">
                  <span className="h-2 w-2 rounded-full bg-[#7FFFD4] animate-pulse" />
                  Welcome to Fakebook
                </span>

                <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-cyan-200 to-fuchsia-300">
                  Find Your Next
                  <br className="hidden md:block" />
                  <span className="ml-2">Binge‑Worthy Moments</span>
                </h1>

                <p className="mt-5 max-w-2xl text-slate-300/90">
                  Explore photos and videos, dive into details, and build your collection — beautifully styled.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[#7FFFD4]">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                    <FiImage className="animate-[float_6s_ease-in-out_infinite]" /> Photos
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                    <FiVideo className="animate-[float_7s_ease-in-out_infinite]" /> Videos
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                    <FiHeart className="animate-[float_5.5s_ease-in-out_infinite]" /> Likes
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                    <FiMessageCircle className="animate-[float_8s_ease-in-out_infinite]" /> Comments
                  </span>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
                  {isAuthenticated ? (
                    <a
                      href="/dashboard"
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/90 via-cyan-500/90 to-fuchsia-500/90 px-6 py-3 font-semibold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Go to Dashboard
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/90 via-cyan-500/90 to-fuchsia-500/90 px-6 py-3 font-semibold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-emerald-500/20"
                      >
                        Get Started
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </a>
                      <a
                        href="/feed"
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-100 hover:bg-white/10 transition-all"
                      >
                        Browse Feed
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;