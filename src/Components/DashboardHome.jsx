// src/Components/DashboardHome.jsx
import { useState } from "react";
import { 
  FiHome, 
  FiUser, 
  FiUsers, 
  FiMessageCircle, 
  FiBell, 
  FiSearch, 
  FiPlus,
  FiImage,
  FiVideo,
  FiHeart,
  FiMoreHorizontal,
  FiShare2,
  FiBookmark,
  FiSettings,
  FiLogOut,
  FiCamera,
  FiSmile
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const DashboardHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  // Mock data for posts
  const [posts] = useState([
    {
      id: 1,
      user: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", verified: true },
      content: "Just had an amazing day exploring the city! The architecture here is incredible. #citylife #explore",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      time: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false
    },
    {
      id: 2,
      user: { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", verified: false },
      content: "Coffee and coding - the perfect combination for a productive morning! ☕️💻",
      time: "4 hours ago",
      likes: 12,
      comments: 5,
      shares: 1,
      liked: true
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">Φ</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#7FFFD4]">Fake</span>Book
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search PhiBook"
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7FFFD4]/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`p-3 rounded-lg transition-colors ${
                  activeTab === 'home' 
                    ? 'bg-[#7FFFD4]/20 text-[#7FFFD4]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-[#7FFFD4]'
                }`}
              >
                <FiHome size={20} />
              </button>
              <button
                onClick={() => setActiveTab('friends')}
                className={`p-3 rounded-lg transition-colors ${
                  activeTab === 'friends' 
                    ? 'bg-[#7FFFD4]/20 text-[#7FFFD4]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-[#7FFFD4]'
                }`}
              >
                <FiUsers size={20} />
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`p-3 rounded-lg transition-colors ${
                  activeTab === 'messages' 
                    ? 'bg-[#7FFFD4]/20 text-[#7FFFD4]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-[#7FFFD4]'
                }`}
              >
                <FiMessageCircle size={20} />
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`p-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-[#7FFFD4]/20 text-[#7FFFD4]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-[#7FFFD4]'
                }`}
              >
                <FiBell size={20} />
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                    alt={user?.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-[#7FFFD4]/30"
                  />
                  <span className="text-sm font-medium text-slate-200">{user?.name || "User"}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors">
                      <FiUser size={16} />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors">
                      <FiSettings size={16} />
                      Settings
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* User Profile Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"}
                  alt={user?.name || "User"}
                  className="w-12 h-12 rounded-full border-2 border-[#7FFFD4]/30"
                />
                <div>
                  <h3 className="font-semibold text-slate-100">{user?.name || "User"}</h3>
                  <p className="text-sm text-slate-400">@{user?.username || "username"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[#7FFFD4]">127</div>
                  <div className="text-xs text-slate-400">Posts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#7FFFD4]">1.2K</div>
                  <div className="text-xs text-slate-400">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#7FFFD4]">856</div>
                  <div className="text-xs text-slate-400">Following</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/feed/new-post')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FiPlus size={16} />
                  Create Post
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors">
                  <FiUsers size={16} />
                  Find Friends
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors">
                  <FiCamera size={16} />
                  Stories
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors">
                  <FiVideo size={16} />
                  Live Video
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Trending</h4>
              <div className="space-y-2">
                {['#TechNews', '#Photography', '#Travel', '#Food', '#Music'].map((topic) => (
                  <button key={topic} className="w-full text-left px-3 py-2 text-sm text-[#7FFFD4] hover:bg-white/5 rounded-lg transition-colors">
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Create Post */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                  alt={user?.name || "User"}
                  className="w-10 h-10 rounded-full border-2 border-[#7FFFD4]/30"
                />
                <button
                  onClick={() => navigate('/feed/new-post')}
                  className="flex-1 text-left px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:bg-white/10 transition-colors"
                >
                  What's on your mind, {user?.name?.split(' ')[0] || 'User'}?
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors">
                    <FiImage className="text-green-400" />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors">
                    <FiVideo className="text-red-400" />
                    Video
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors">
                    <FiSmile className="text-yellow-400" />
                    Feeling
                  </button>
                </div>
                <button 
                  onClick={() => navigate('/feed/new-post')}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-slate-900 font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full border-2 border-[#7FFFD4]/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-100">{post.user.name}</h4>
                        {post.user.verified && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors">
                    <FiMoreHorizontal />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-slate-200 mb-3">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg border border-white/10"
                    />
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
                      <FiHeart className={post.liked ? "text-red-400 fill-current" : ""} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-[#7FFFD4] transition-colors">
                      <FiMessageCircle />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                      <FiShare2 />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-yellow-400 transition-colors">
                    <FiBookmark />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Friend Suggestions */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Friend Suggestions</h4>
              <div className="space-y-3">
                {[
                  { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", mutual: 12 },
                  { name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", mutual: 8 },
                  { name: "Ryan Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", mutual: 15 }
                ].map((friend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full border-2 border-[#7FFFD4]/30"
                      />
                      <div>
                        <h5 className="font-medium text-slate-100 text-sm">{friend.name}</h5>
                        <p className="text-xs text-slate-400">{friend.mutual} mutual friends</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#7FFFD4]/20 text-[#7FFFD4] text-xs font-medium rounded-lg hover:bg-[#7FFFD4]/30 transition-colors">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <FiHeart className="text-emerald-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">Sarah liked your post</p>
                    <p className="text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FiMessageCircle className="text-blue-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">Mike commented on your photo</p>
                    <p className="text-xs text-slate-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FiUsers className="text-purple-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">Alex sent you a friend request</p>
                    <p className="text-xs text-slate-400">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
