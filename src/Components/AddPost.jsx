// src/Components/AddPost.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useFeed } from "../contexts/FeedContext";

const AddPost = () => {
  const nav = useNavigate();
  const { createPost } = useFeed();
  const [form, setForm] = useState({ text: "", imageUrl: "", videoUrl: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.text && !form.imageUrl && !form.videoUrl) {
      setError("Provide at least text, image, or a YouTube URL.");
      return;
    }
    const p = createPost(form);
    if (p) nav("/feed/my-posts");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40">
        <form onSubmit={submit} className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-6 space-y-4">
          <textarea
            className="textarea textarea-bordered w-full bg-white/10"
            placeholder="Say something..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <input
            className="input input-bordered w-full bg-white/10"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input
            className="input input-bordered w-full bg-white/10"
            placeholder="YouTube video URL (optional)"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <div className="flex items-center gap-2">
            <button className="btn rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90">Post</button>
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;