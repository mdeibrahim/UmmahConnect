// src/Components/Navbar.jsx
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiLogOut, FiHome, FiPlusCircle, FiList } from "react-icons/fi";
import { useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ variant = "default" }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = (to, variant = "ghost") => {
    const active = location.pathname === to;
    if (variant === "primary") {
      return [
        "px-3 py-2 rounded-lg text-sm font-medium transition",
        "bg-[#7FFFD4] text-slate-900 hover:bg-emerald-300/90",
        "hover:underline underline-offset-4 decoration-2 decoration-slate-900",
        active ? "underline" : "",
      ].join(" ");
    }
    return [
      "px-3 py-2 rounded-lg text-sm font-medium transition",
      "text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5",
      "hover:underline underline-offset-4 decoration-2 decoration-[#7FFFD4]",
      active ? "text-[#7FFFD4] underline" : "",
    ].join(" ");
  };

  const feedActive = location.pathname.startsWith("/feed");
  const active = (p) => location.pathname === p;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b border-white/10 backdrop-blur-md transition-colors ${
          scrolled ? "bg-slate-900/70" : "bg-slate-900/50"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight">
              <span className="text-[#7FFFD4]">Fake</span>book
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              <a
                href="/"
                aria-current={location.pathname === "/" ? "page" : undefined}
                className={linkCls("/")}
              >
                Home
              </a>
              
              <a
                href="/feed"
                aria-current={feedActive ? "page" : undefined}
                className={`${linkCls("/feed")} ${feedActive ? "text-[#7FFFD4] underline" : ""}`}
              >
                Feed
              </a>
              
              {loading ? (
                <div className="px-3 py-2 text-sm text-slate-300">
                  Loading...
                </div>
              ) : !loading && isAuthenticated ? (
                <>
                  <a
                    href="/feed/my-posts"
                    aria-current={location.pathname === "/feed/my-posts" ? "page" : undefined}
                    className={linkCls("/feed/my-posts")}
                  >
                    My Posts
                  </a>
                  <a
                    href="/feed/new-post"
                    aria-current={location.pathname === "/feed/new-post" ? "page" : undefined}
                    className={linkCls("/feed/new-post", "primary")}
                  >
                    Add Post
                  </a>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-sm text-slate-300">Welcome, {user?.name || user?.email}</span>
                    <button
                      onClick={logout}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a
                    href="/register"
                    aria-current={location.pathname === "/register" ? "page" : undefined}
                    className={linkCls("/register")}
                  >
                    Register
                  </a>
                  <a
                    href="/login"
                    aria-current={location.pathname === "/login" ? "page" : undefined}
                    className={linkCls("/login", "primary")}
                  >
                    Login
                  </a>
                </>
              )}
            </nav>

            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#7FFFD4]/40"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden border-b border-white/10 backdrop-blur-md bg-slate-900/70 transition ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
          <a
            href="/"
            aria-current={location.pathname === "/" ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={linkCls("/")}
          >
            Home
          </a>
          <a
            href="/feed"
            aria-current={feedActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`${linkCls("/feed")} ${feedActive ? "text-[#7FFFD4] underline" : ""}`}
          >
            Feed
          </a>
          
          {loading ? (
            <div className="px-3 py-2 text-sm text-slate-300">
              Loading...
            </div>
          ) : !loading && isAuthenticated ? (
            <>
              <a
                href="/feed/my-posts"
                aria-current={location.pathname === "/feed/my-posts" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={linkCls("/feed/my-posts")}
              >
                <FiList className="inline mr-2" />
                My Posts
              </a>
              <a
                href="/feed/new-post"
                aria-current={location.pathname === "/feed/new-post" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={linkCls("/feed/new-post", "primary")}
              >
                <FiPlusCircle className="inline mr-2" />
                Add Post
              </a>
              <div className="pt-2 border-t border-white/10">
                <div className="text-sm text-slate-300 mb-2">Welcome, {user?.name || user?.email}</div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition text-slate-200/90 hover:text-[#7FFFD4] hover:bg-white/5"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <a
                href="/register"
                aria-current={location.pathname === "/register" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={linkCls("/register")}
              >
                Register
              </a>
              <a
                href="/login"
                aria-current={location.pathname === "/login" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={linkCls("/login", "primary")}
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;