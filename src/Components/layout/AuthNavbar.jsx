import { FiUser, FiPlus, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function AuthNavber({ onLogout }) {
  const navigate = useNavigate();
  return (
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
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}


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