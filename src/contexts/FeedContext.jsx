// src/contexts/FeedContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const FeedContext = createContext(null);

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

export const currentUser = { id: "u_me", name: "You" };

const seedPosts = [
  {
    id: uid(),
    userId: "u_me",
    authorName: "You",
    text: "Launching PhiBook dashboard ✨",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "",
    likesBy: [],
    createdAt: now(),
  },
  {
    id: uid(),
    userId: "u_jane",
    authorName: "Jane Roe",
    text: "This video is a vibe!",
    imageUrl: "",
    videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    likesBy: ["u_me"],
    createdAt: now(),
  },
];

const seedComments = [
  {
    id: uid(),
    postId: seedPosts[0].id,
    userId: "u_jane",
    authorName: "Jane Roe",
    content: "Congrats! 🚀",
    createdAt: now(),
  },
];

export function FeedProvider({ children }) {
  const [posts, setPosts] = useState(seedPosts);
  const [comments, setComments] = useState(seedComments);

  const getPostById = (id) => posts.find((p) => p.id === id) || null;

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likesBy: p.likesBy.includes(currentUser.id)
                ? p.likesBy.filter((u) => u !== currentUser.id)
                : [...p.likesBy, currentUser.id],
            }
          : p
      )
    );
  };

  const addComment = (postId, content) => {
    const c = {
      id: uid(),
      postId,
      userId: currentUser.id,
      authorName: currentUser.name,
      content: String(content || "").trim(),
      createdAt: now(),
    };
    if (!c.content) return;
    setComments((prev) => [...prev, c]);
  };

  const updateComment = (commentId, content) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: String(content || "").trim() } : c))
    );
  };

  const deleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const createPost = ({ text = "", imageUrl = "", videoUrl = "" }) => {
    if (!text && !imageUrl && !videoUrl) return null;
    const p = {
      id: uid(),
      userId: currentUser.id,
      authorName: currentUser.name,
      text,
      imageUrl,
      videoUrl,
      likesBy: [],
      createdAt: now(),
    };
    setPosts((prev) => [p, ...prev]);
    return p;
  };

  const updatePost = (id, payload) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...payload } : p))
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setComments((prev) => prev.filter((c) => c.postId !== id));
  };

  const value = useMemo(
    () => ({
      posts,
      comments,
      getPostById,
      toggleLike,
      addComment,
      updateComment,
      deleteComment,
      createPost,
      updatePost,
      deletePost,
      currentUser,
    }),
    [posts, comments]
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export const useFeed = () => useContext(FeedContext);