// src/LayOuts/FeedLayout.jsx
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
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
            <Navbar />

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