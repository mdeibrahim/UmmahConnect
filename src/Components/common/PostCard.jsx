// src/Components/PostCard.jsx
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiExternalLink, FiMoreHorizontal, FiThumbsUp, FiThumbsDown, FiShare2 } from "react-icons/fi";

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
  <div className="group w-full max-w-lg mx-auto mb-6">
    {/* Animated background pattern */}
    <div className="absolute inset-0 rounded-2xl opacity-20">
      <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-fuchsia-400/20 to-rose-400/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-md animate-pulse delay-700"></div>
    </div>
    
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_8px_32px_rgba(127,255,212,0.08)] hover:shadow-[0_16px_48px_rgba(127,255,212,0.15)] transition-all duration-500 hover:scale-[1.02]">
      <div className="rounded-[calc(1rem-1px)] bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-xl border border-white/20 p-5 hover:border-white/30 transition-all duration-300 relative overflow-hidden">
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(236,253,245,0.1) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, rgba(153,246,228,0.1) 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  </div>
);



export default function PostCard({
  post,
  // onView,
  liked: likedProp,
  likesCount: likesCountProp,
  commentsCount,
  ownerActions = false,
  onEdit,
  onDelete,
  onLikeToggle,
}) {
  const embed = toEmbed(post.video_url);
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const menuRef = useRef(null);

  // Like/Dislike state
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(likesCountProp || 0);
  const [dislikesCount, setDislikesCount] = useState(0); // You may want to get this from props if available
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(Array.isArray(post.comments) ? post.comments : []);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikesCount(dislikesCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikesCount(dislikesCount - 1);
    } else {
      setDisliked(true);
      setDislikesCount(dislikesCount + 1);
      if (liked) {
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    }
  };

  const handleCommentButton = () => {
    setShowComments((v) => !v);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    // For now, just add locally. Integrate with backend as needed.
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: user || { name: "You" },
        text: newComment,
        created_at: new Date().toISOString(),
      },
    ]);
    setNewComment("");
  };


  return (
    <CardShell>
      {/* Enhanced Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-0.5 animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-slate-900 p-0.5">
              <img
                src={post.user?.profile_picture || post.user?.avatar || "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Online status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse">
            <div className="absolute inset-0.5 bg-emerald-300 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-100 text-sm truncate">
              {post.user?.full_name || post.user?.name || post.user?.email || "Unknown User"}
            </h3>
            {/* Verified badge */}
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-slate-400">
              {(() => {
                const dateStr = post.created_at || post.createdAt;
                const date = dateStr ? new Date(dateStr) : null;
                if (!date || isNaN(date)) return "Just now";
                
                const now = new Date();
                const diffMs = now - date;
                const diffMins = Math.floor(diffMs / (1000 * 60));
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                
                if (diffMins < 1) return "Just now";
                if (diffMins < 60) return `${diffMins}m ago`;
                if (diffHours < 24) return `${diffHours}h ago`;
                if (diffDays < 7) return `${diffDays}d ago`;
                return date.toLocaleDateString();
              })()}
            </p>
            <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
            <div className="flex items-center gap-1 text-xs text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Public</span>
            </div>
          </div>
        </div>
        {ownerActions && isAuthenticated && (
          <div className="relative flex items-center gap-2" ref={menuRef}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="btn btn-xs rounded-lg bg-white/5 hover:bg-white/10 text-slate-200/90 cursor-pointer"
              aria-label="Post options"
            >
              <FiMoreHorizontal />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 mt-2 w-28 text-xs bg-slate-800 border border-white/10 rounded-lg shadow-lg z-10 flex flex-col">
                <button
                  onClick={() => { setShowMenu(false); onEdit && onEdit(); }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 text-slate-200/90 rounded-t-lg cursor-pointer"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => { setShowMenu(false); onDelete && onDelete(); }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-rose-500/20 text-rose-200 rounded-b-lg cursor-pointer"
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
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${liked ? 'bg-emerald-400/30 text-emerald-300' : 'bg-white/5 text-slate-200/80 hover:bg-emerald-400/10'}`}
              onClick={handleLike}
              aria-label="Like"
            >
              <FiThumbsUp /> {likesCount}
            </button>
            <button
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${disliked ? 'bg-rose-400/30 text-rose-300' : 'bg-white/5 text-slate-200/80 hover:bg-rose-400/10'}`}
              onClick={handleDislike}
              aria-label="Dislike"
            >
              <FiThumbsDown /> {dislikesCount}
            </button>
            <button
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-colors bg-white/5 text-slate-200/80 hover:bg-cyan-400/10"
              aria-label="Comment"
              onClick={handleCommentButton}
            >
              <FiMessageCircle /> Comment
            </button>
          </div>
        {/* <button
          onClick={onView}
    className="btn btn-sm rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90 cursor-pointer"
        >
          <FiExternalLink className="mr-1" /> View
        </button> */}
      </div>
      {showComments && (
        <div className="mt-4 bg-slate-800/80 rounded-xl p-4 border border-white/10">
          <div className="mb-2 font-semibold text-slate-200">Comments</div>
          <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
            {comments.length === 0 ? (
              <div className="text-xs text-slate-400">No comments yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-sm">
                  <span className="font-semibold text-emerald-300">{c.user?.full_name || c.user?.name || c.user?.email || "User"}</span>
                  <span className="text-slate-300">{c.text}</span>
                  <span className="ml-auto text-xs text-slate-500">{c.created_at ? new Date(c.created_at).toLocaleString() : ""}</span>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg px-3 py-1 bg-slate-900/80 border border-white/10 text-slate-200 focus:outline-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-1 rounded-lg bg-emerald-400/80 text-slate-900 font-semibold hover:bg-emerald-300/90"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </CardShell>
  );
}