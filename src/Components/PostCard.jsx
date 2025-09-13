// src/Components/PostCard.jsx
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiExternalLink, FiMoreHorizontal, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

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