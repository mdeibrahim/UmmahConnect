// src/Components/Feed.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router";
import PostCard from "./PostCard";
import { useFeed, currentUser } from "../contexts/FeedContext";

const Feed = () => {
  const nav = useNavigate();
  const { posts, comments, toggleLike } = useFeed();

  const list = useMemo(
    () =>
      posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((p) => ({
          ...p,
          likesCount: p.likesBy.length,
          liked: p.likesBy.includes(currentUser.id),
          commentsCount: comments.filter((c) => c.postId === p.id).length,
        })),
    [posts, comments]
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Feed</h1>
      {list.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          onView={() => nav(`/feed/post/${p.id}`)}
          onLike={() => toggleLike(p.id)}
          liked={p.liked}
          likesCount={p.likesCount}
          commentsCount={p.commentsCount}
          ownerActions={p.userId === currentUser.id}
          onEdit={() => nav(`/feed/edit/${p.id}`)}
          onDelete={() => nav(`/feed/my-posts?del=${p.id}`)}
        />
      ))}
      {list.length === 0 && <p className="opacity-70">No posts yet.</p>}
    </div>
  );
};

export default Feed;