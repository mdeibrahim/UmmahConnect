// src/Components/PostCard.jsx
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiExternalLink, FiMoreHorizontal } from "react-icons/fi";

function toEmbed(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {}
  return "";
}

const CardShell = ({ children }) => (
  <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_40px_rgba(127,255,212,0.08)]">
    <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-6">
      {children}
    </div>
  </div>
);

export default function PostCard({
  post,
  // onView,
  onLike,
  liked,
  likesCount,
  commentsCount,
  ownerActions = false,
  onEdit,
  onDelete,
}) {
  const embed = toEmbed(post.video_url);
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const menuRef = useRef(null);

  // Debug log to help diagnose 3-dot menu visibility
  console.log('[PostCard] ownerActions:', ownerActions, '| isAuthenticated:', isAuthenticated, '| user?.id:', user?.id, '| post.user?.id:', post.user?.id);
  console.log(JSON.parse(localStorage.getItem('user')))

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <div>
          <img
            src={post.user?.profile_picture || post.user?.avatar || "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"}
            alt="user"
            className="w-10 h-10 rounded-full border border-white/10"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{post.user?.full_name || post.user?.name || post.user?.email || "Unknown"}</h3>
          <p className="text-xs opacity-60">{
            (() => {
              const dateStr = post.created_at || post.createdAt;
              const date = dateStr ? new Date(dateStr) : null;
              return date && !isNaN(date) ? date.toLocaleString() : "";
            })()
          }</p>
        </div>
        {ownerActions && isAuthenticated && (
          <div className="relative flex items-center gap-2" ref={menuRef}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="btn btn-xs rounded-lg bg-white/5 hover:bg-white/10 text-slate-200/90"
              aria-label="Post options"
            >
              <FiMoreHorizontal />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 mt-2 w-28 text-xs bg-slate-800 border border-white/10 rounded-lg shadow-lg z-10 flex flex-col">
                <button
                  onClick={() => { setShowMenu(false); onEdit && onEdit(); }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 text-slate-200/90 rounded-t-lg"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => { setShowMenu(false); onDelete && onDelete(); }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-rose-500/20 text-rose-200 rounded-b-lg"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>


      {post.text && <p className="mt-3">{post.text}</p>}

      {(post.image || post.image_url) && (
        <img src={post.image || post.image_url} alt="post" className="mt-3 rounded-xl border border-white/10" />
      )}

      {embed && (
        <div className="mt-3 aspect-video">
          <iframe
            className="w-full h-full rounded-xl border border-white/10"
            src={embed}
            title="video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={onLike}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 transition ${
              liked ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-slate-200/90 hover:bg-white/10"
            }`}
          >
            <FiHeart /> {typeof post.total_likes === 'number' ? post.total_likes : likesCount}
          </button>
          <span className="inline-flex items-center gap-1 opacity-80">
            <FiMessageCircle /> {Array.isArray(post.comments) ? post.comments.length : (commentsCount ?? 0)}
          </span>
        </div>
        {/* <button
          onClick={onView}
          className="btn btn-sm rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90"
        >
          <FiExternalLink className="mr-1" /> View
        </button> */}
      </div>
    </CardShell>
  );
}