// src/Components/MyPosts.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useFeed, currentUser } from "../../contexts/FeedContext";
import PostCard from "./PostCard";

const MyPostsPage = () => {
  const nav = useNavigate();
  const { posts, comments, deletePost, toggleLike,  } = useFeed();

  const myPosts = useMemo(
    () =>
      posts
        .filter((p) => p.userId === currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Posts</h1>
  <a href="/feed/new-post" className="btn rounded-lg bg-[#7FFFD4]/90 text-slate-900 hover:bg-emerald-300/90 cursor-pointer">
          Add Post
        </a>
      </div>

      {myPosts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          liked={Array.isArray(p.likesBy) ? p.likesBy.includes(currentUser.id) : false}
          likesCount={p.likesBy.length}
          commentsCount={comments.filter((c) => c.postId === p.id).length}
          ownerActions
          onEdit={() => nav(`/feed/edit/${p.id}`)}
          onDelete={() => deletePost(p.id)}
        />
      ))}

      {myPosts.length === 0 && <p className="opacity-70">You haven't posted anything yet.</p>}
    </div>
  );
};

export default MyPostsPage;