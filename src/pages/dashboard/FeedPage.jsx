// src/Components/Feed.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostCard from "./PostCard";
import { USER_ALL_POSTS_API } from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";

const FeedPage = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(USER_ALL_POSTS_API);
        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          setError(data.message || 'Failed to fetch posts');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Feed</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && posts.map((p) => (
        <PostCard
          key={p.id || p._id}
          post={p}
          commentsCount={p.commentsCount || (Array.isArray(p.comments) ? p.comments.length : 0)}
          ownerActions={user && p.user && (user.id === p.user.id)}
        />
      ))}
      {!loading && !error && posts.length === 0 && <p className="opacity-70">No posts yet.</p>}
    </div>
  );
};

export default FeedPage;