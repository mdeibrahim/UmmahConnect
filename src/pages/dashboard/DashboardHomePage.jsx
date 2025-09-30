import { useState, useEffect } from "react";
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
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { USER_PROFILE_API, USER_ALL_POSTS_API } from '../utils/api';

import PostCard from "./PostCard";

const DashboardHome = () => {
  const { user, logout, token } = useAuth(); // Make sure token is available from AuthContext
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewAllPosts, setViewAllPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setPostsLoading(true);

    const authToken = token || localStorage.getItem('authToken');
    if (!authToken) {
      setError('No authentication token found. Please login again.');
      setPostsError('No authentication token found. Please login again.');
      setLoading(false);
      setPostsLoading(false);
      return;
    }

    try {
      const profileRequest = fetch(USER_PROFILE_API, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const postsRequest = fetch(USER_ALL_POSTS_API, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const [profileRes, postsRes] = await Promise.all([profileRequest, postsRequest]);

      // Handle Profile
      if (!profileRes.ok) throw new Error(`Profile HTTP error! status: ${profileRes.status}`);
      const profileData = await profileRes.json();
      if (profileData.status === 'success') {
        setProfileData(profileData.data);
      } else {
        setError(profileData.message || 'Failed to fetch profile data');
      }

      // Handle Posts
      if (!postsRes.ok) throw new Error(`Posts HTTP error! status: ${postsRes.status}`);
      const postsData = await postsRes.json();
      if (postsData.status === 'success') {
        setViewAllPosts(postsData.data || []);
      } else {
        setPostsError(postsData.message || 'Failed to fetch posts');
      }

    } catch (err) {
      setError(err.message);
      setPostsError(err.message);
    } finally {
      setLoading(false);
      setPostsLoading(false);
    }
  };

  fetchData();
}, [token]);


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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm"><img src="/images/logo1m.png" alt="Logo" /></span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#7FFFD4]">Ummah</span>Connect
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search UmmahConnect"
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7FFFD4]/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation (only for authenticated users) */}
            {user && (
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
            )}

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <img
                    src={profileData?.profile_picture || "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"}
                    alt={profileData?.full_name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-[#7FFFD4]/30"
                  />
                  <span className="text-sm font-medium text-slate-200">{profileData?.full_name || "User"}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                      <FiUser size={16} />
                      Profile
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                      onClick={() => navigate('/subscription')}
                    >
                      <FiPlus size={16} />
                      Subscription
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                      <FiSettings size={16} />
                      Settings
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
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
                  src={profileData?.profile_picture || "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"}
                  alt={profileData?.full_name || "User"}
                  className="w-12 h-12 rounded-full border-2 border-[#7FFFD4]/30"
                />
                <div>
                  <h3 className="font-semibold text-slate-100">{profileData?.full_name || user?.name || "User"}</h3>
                  <p className="text-sm text-slate-400">@{profileData?.username || user?.username || "username"}</p>
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
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <FiPlus size={16} />
                  Create Post
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                  <FiUsers size={16} />
                  Find Friends
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                  <FiCamera size={16} />
                  Stories
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
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
                  <button key={topic} className="w-full text-left px-3 py-2 text-sm text-[#7FFFD4] hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
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
                  src={profileData?.profile_picture || "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"}
                  alt={profileData?.profile_picture || "User"}
                  className="w-10 h-10 rounded-full border-2 border-[#7FFFD4]/30"
                />
                <button
                  onClick={() => navigate('/feed/new-post')}
                  className="flex-1 text-left px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  What's on your mind, {profileData?.full_name}?
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <FiImage className="text-green-400" />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <FiVideo className="text-red-400" />
                    Video
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <FiSmile className="text-yellow-400" />
                    Feeling
                  </button>
                </div>
                <button 
                  onClick={() => navigate('/feed/new-post')}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-slate-900 font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all cursor-pointer"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {viewAllPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                commentsCount={post.commentsCount || (Array.isArray(post.comments) ? post.comments.length : 0)}
                ownerActions={user && post.user && user.id === post.user.id}
              />
            ))}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Friend Suggestions */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold text-slate-100 mb-3">Friend Suggestions</h4>
              <div className="space-y-3">
                {[
                  { name: "Rifat Rahman", avatar: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png", mutual: 12 },
                  { name: "Rikon", avatar: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png", mutual: 8 },
                  { name: "Sifat ali", avatar: "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png", mutual: 15 }
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
                    <button className="px-3 py-1 bg-[#7FFFD4]/20 text-[#7FFFD4] text-xs font-medium rounded-lg hover:bg-[#7FFFD4]/30 transition-colors cursor-pointer">
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
                    <p className="text-sm text-slate-200">Rifat liked your post</p>
                    <p className="text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FiMessageCircle className="text-blue-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">Rikon commented on your photo</p>
                    <p className="text-xs text-slate-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FiUsers className="text-purple-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">Sifat sent you a friend request</p>
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
