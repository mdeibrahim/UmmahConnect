// src/LayOuts/FeedLayout.jsx
import { Outlet, useLocation } from "react-router";
import { FiHome, FiPlusCircle, FiList } from "react-icons/fi";
import { FeedProvider } from "../contexts/FeedContext";

const LinkItem = ({ href, active, children }) => (
  <a
    href={href}
    className={`flex items-center gap-3 rounded-xl px-3 py-2 transition
    ${active ? "bg-white/10 text-[#7FFFD4]" : "text-slate-200/90 hover:bg-white/5 hover:text-[#7FFFD4]"}`}
  >
    {children}
  </a>
);

const FeedLayout = () => {
  const location = useLocation();
  const active = (p) => location.pathname === p;

  return (
    <FeedProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 fakebook-grid">
        <div className="drawer">
          <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-14 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="dash-drawer"
                      className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5 cursor-pointer"
                      aria-label="Open sidebar"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </label>
                    <span className="text-lg font-bold tracking-tight">
                      <span className="text-[#7FFFD4]">Phi</span>Book • Feed
                    </span>
                  </div>
                  <nav className="hidden lg:flex items-center gap-1">
                    <a
                      href="/"
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition hover:underline underline-offset-4 decoration-2 decoration-[#7FFFD4] ${
                        active("/") ? "text-[#7FFFD4] underline" : "text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5"
                      }`}
                    >
                      Home
                    </a>
                    <a
                      href="/feed"
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition hover:underline underline-offset-4 decoration-2 decoration-[#7FFFD4] ${
                        active("/feed") ? "text-[#7FFFD4] underline" : "text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5"
                      }`}
                    >
                      Feed
                    </a>
                    <a
                      href="/feed/my-posts"
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition hover:underline underline-offset-4 decoration-2 decoration-[#7FFFD4] ${
                        active("/feed/my-posts") ? "text-[#7FFFD4] underline" : "text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5"
                      }`}
                    >
                      My Posts
                    </a>
                    <a
                      href="/feed/new-post"
                      className="px-3 py-2 rounded-lg text-sm font-medium transition bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90"
                    >
                      Add Post
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6">
              <Outlet />
            </main>
            <div className="fakebook-vignette" />
          </div>

          {/* Sidebar for small/medium screens */}
          <div className="drawer-side lg:hidden">
            <label htmlFor="dash-drawer" className="drawer-overlay" aria-label="close sidebar"></label>
            <aside className="min-h-full w-72 bg-slate-900/70 backdrop-blur-md border-r border-white/10 p-4">
              <div className="mb-4 text-lg font-bold">
                <span className="text-[#7FFFD4]">Phi</span>Book
              </div>
              <nav className="flex flex-col gap-1">
                <LinkItem href="/" active={active("/")}>
                  <FiHome /> Home
                </LinkItem>
                <LinkItem href="/feed" active={active("/feed")}>
                  <FiHome /> Feed
                </LinkItem>
               
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </FeedProvider>
  );
};

export default FeedLayout;