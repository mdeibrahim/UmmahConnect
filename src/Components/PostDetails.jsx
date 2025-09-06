// src/Components/PostDetails.jsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFeed, currentUser } from "../contexts/FeedContext";
import PostCard from "./PostCard";

const CommentItem = ({ c, canEdit, onSave, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(c.content);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium">
            {c.authorName}{" "}
            <span className="opacity-60 font-normal">• {new Date(c.createdAt).toLocaleString()}</span>
          </div>
          {!editing ? (
            <p className="mt-1">{c.content}</p>
          ) : (
            <div className="mt-2 flex items-center gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input input-sm input-bordered w-full bg-white/10"
              />
              <button className="btn btn-sm" onClick={() => { onSave(text); setEditing(false); }}>
                Save
              </button>
              <button className="btn btn-sm btn-ghost" onClick={() => { setText(c.content); setEditing(false); }}>
                Cancel
              </button>
            </div>
          )}
        </div>
        {canEdit && !editing && (
          <div className="flex gap-2">
            <button className="btn btn-xs" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-xs btn-error" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

const PostDetails = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { getPostById, comments, toggleLike, addComment, updateComment, deleteComment } = useFeed();
  const post = getPostById(id);

  const data = useMemo(() => {
    if (!post) return null;
    return {
      ...post,
      liked: post.likesBy.includes(currentUser.id),
      likesCount: post.likesBy.length,
      commentsList: comments
        .filter((c) => c.postId === post.id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    };
  }, [post, comments]);

  const [content, setContent] = useState("");

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="space-y-4">
      <button className="btn btn-sm rounded-lg bg-white/5 hover:bg-white/10" onClick={() => nav(-1)}>
        Back
      </button>

      <PostCard
        post={post}
        onView={() => {}}
        onLike={() => toggleLike(post.id)}
        liked={data.liked}
        likesCount={data.likesCount}
        commentsCount={data.commentsList.length}
      />

      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40">
        <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-3">Comments</h2>

          <form
            className="mb-4 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (content.trim()) {
                addComment(post.id, content.trim());
                setContent("");
              }
            }}
          >
            <input
              className="input input-bordered flex-1 bg-white/10"
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90">
              Post
            </button>
          </form>

          <div className="grid gap-2">
            {data.commentsList.map((c) => (
              <CommentItem
                key={c.id}
                c={c}
                canEdit={c.userId === currentUser.id}
                onSave={(text) => updateComment(c.id, text)}
                onDelete={() => deleteComment(c.id)}
              />
            ))}
            {data.commentsList.length === 0 && <p className="opacity-70">No comments yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;