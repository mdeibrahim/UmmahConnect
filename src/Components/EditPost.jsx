// src/Components/EditPost.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFeed } from "../contexts/FeedContext";

const EditPost = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { getPostById, updatePost } = useFeed();
  const post = getPostById(id);

  const [form, setForm] = useState({ text: "", imageUrl: "", videoUrl: "" });

  useEffect(() => {
    if (post) setForm({ text: post.text || "", imageUrl: post.imageUrl || "", videoUrl: post.videoUrl || "" });
  }, [post]);

  if (!post) return <p>Post not found.</p>;

  const save = (e) => {
    e.preventDefault();
    updatePost(post.id, form);
    nav("/feed/my-posts");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40">
        <form onSubmit={save} className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-6 space-y-4">
          <textarea
            className="textarea textarea-bordered w-full bg-white/10"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <input
            className="input input-bordered w-full bg-white/10"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input
            className="input input-bordered w-full bg-white/10"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />

          <div className="flex items-center gap-2">
            <button className="btn rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90">Save</button>
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;