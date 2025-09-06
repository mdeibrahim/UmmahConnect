// src/Components/PostCard.jsx
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

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
  onView,
  onLike,
  liked,
  likesCount,
  commentsCount,
  ownerActions = false,
  onEdit,
  onDelete,
}) {
  const embed = toEmbed(post.videoUrl);

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{post.authorName}</h3>
          <p className="text-xs opacity-60">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
        {ownerActions && (
          <div className="flex items-center gap-2">
            <button onClick={onEdit} className="btn btn-xs rounded-lg bg-white/5 hover:bg-white/10 text-slate-200/90">
              <FiEdit2 className="mr-1" /> Edit
            </button>
            <button onClick={onDelete} className="btn btn-xs rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200">
              <FiTrash2 className="mr-1" /> Delete
            </button>
          </div>
        )}
      </div>

      {post.text && <p className="mt-3">{post.text}</p>}

      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="mt-3 rounded-xl border border-white/10" />
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
            <FiHeart /> {likesCount}
          </button>
          <span className="inline-flex items-center gap-1 opacity-80">
            <FiMessageCircle /> {commentsCount ?? 0}
          </span>
        </div>
        <button
          onClick={onView}
          className="btn btn-sm rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90"
        >
          <FiExternalLink className="mr-1" /> View
        </button>
      </div>
    </CardShell>
  );
}