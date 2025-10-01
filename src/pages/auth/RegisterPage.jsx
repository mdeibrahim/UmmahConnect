// src/Components/Register.jsx
import { useState, useCallback, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiLoader, FiUserPlus } from "react-icons/fi";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router";

// Custom CSS animations (matching Login page)
const styles = `
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }
  
  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('register-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'register-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Clear API error when form changes
  useEffect(() => {
    if (apiError) {
      setApiError("");
    }
  }, [form.name, form.email, form.password, form.confirm]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter' && !loading) {
          e.preventDefault();
          document.querySelector('form')?.requestSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  const validate = useCallback(() => {
    const e = {};
    
    // Name validation
    if (!form.name?.trim()) {
      e.name = "Full name is required.";
    } else if (form.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters long.";
    } else if (form.name.trim().length > 50) {
      e.name = "Name is too long (maximum 50 characters).";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      e.name = "Name should only contain letters and spaces.";
    }
    
    // Email validation
    if (!form.email?.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email address.";
    }
    
    // Password validation
    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters long.";
    } else if (form.password.length > 128) {
      e.password = "Password is too long (maximum 128 characters).";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      e.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }
    
    // Confirm password validation
    if (!form.confirm) {
      e.confirm = "Please confirm your password.";
    } else if (form.confirm !== form.password) {
      e.confirm = "Passwords do not match.";
    }
    
    // Terms validation
    if (!form.terms) {
      e.terms = "Please accept the terms and conditions.";
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form.name, form.email, form.password, form.confirm, form.terms]);

  const onSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setApiError("");

    try {
      const result = await authAPI.register(form);
      console.log('Register API result:', result);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        const errorMessage = result.error || result.data?.message || 'Registration failed. Please try again.';
        setApiError(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [form, validate]);

  if (submitted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 flex items-center justify-center min-h-screen">
          <div className="max-w-lg w-full rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_60px_rgba(127,255,212,0.15)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-[#7FFFD4]">
                <FiCheckCircle size={28} />
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-cyan-200 to-fuchsia-300">
                Verify your email
              </h2>
              <p className="mt-3 text-slate-300/90">
                We’ve sent a verification link to your inbox. Click it to activate your account.
              </p>
              <a
                href="/login"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500/90 via-cyan-500/90 to-fuchsia-500/90 px-6 py-3 font-semibold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Main card with enhanced glassmorphism */}
          <div className="group relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-fuchsia-500/30 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Card border */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400/50 via-cyan-400/40 to-fuchsia-500/50 shadow-[0_0_60px_rgba(127,255,212,0.25)] hover:shadow-[0_0_80px_rgba(127,255,212,0.35)] transition-all duration-500">
              <div className="rounded-[calc(1rem-1px)] bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-6 md:p-7 hover:bg-slate-900/90 transition-all duration-300">
                {/* Header with enhanced animations */}
                <div className="text-center space-y-3 mb-6">
                  <div className="inline-block animate-bounce">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-4 py-1.5 text-xs text-slate-300/90 shadow-lg backdrop-blur-sm hover:border-[#7FFFD4]/40 transition-all duration-300">
                      <FiUserPlus className="text-[#7FFFD4] animate-pulse w-3 h-3" />
                      Join the Community
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 animate-gradient-x">
                      Create account for
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-emerald-300 animate-gradient-x">
                      UmmahConnect
                    </span>
                  </h1>
                  
                  <p className="text-slate-400/90 text-xs leading-relaxed">
                    Start sharing your journey with the global community
                  </p>
                </div>

                {/* Enhanced form */}
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Full name field with floating label effect */}
                  <div className="group">
                    <label className="mb-2 block text-sm font-medium text-slate-300 group-focus-within:text-[#7FFFD4] transition-colors duration-200">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4] z-10 group-focus-within:scale-110 transition-transform duration-200" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={useCallback((e) => {
                          setForm(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                        }, [errors.name])}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        disabled={loading}
                        className="relative w-full rounded-xl border border-white/20 bg-white/5 px-10 py-3 text-slate-100 placeholder-slate-500/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/60 focus:border-[#7FFFD4]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-white/30 backdrop-blur-sm z-10"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-rose-400 flex items-center gap-1 animate-slide-down">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field with floating label effect */}
                  <div className="group">
                    <label className="mb-2 block text-sm font-medium text-slate-300 group-focus-within:text-[#7FFFD4] transition-colors duration-200">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4] z-10 group-focus-within:scale-110 transition-transform duration-200" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={useCallback((e) => {
                          setForm(prev => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }, [errors.email])}
                        placeholder="your@email.com"
                        autoComplete="email"
                        disabled={loading}
                        className="relative w-full rounded-xl border border-white/20 bg-white/5 px-10 py-3 text-slate-100 placeholder-slate-500/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/60 focus:border-[#7FFFD4]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-white/30 backdrop-blur-sm z-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-rose-400 flex items-center gap-1 animate-slide-down">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password field with enhanced styling */}
                  <div className="group">
                    <label className="mb-2 block text-sm font-medium text-slate-300 group-focus-within:text-[#7FFFD4] transition-colors duration-200">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4] z-10 group-focus-within:scale-110 transition-transform duration-200" />
                      <input
                        type={showPwd ? "text" : "password"}
                        value={form.password}
                        onChange={useCallback((e) => {
                          setForm(prev => ({ ...prev, password: e.target.value }));
                          if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                        }, [errors.password])}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        disabled={loading}
                        className="relative w-full rounded-xl border border-white/20 bg-white/5 px-10 py-3 pr-12 text-slate-100 placeholder-slate-500/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/60 focus:border-[#7FFFD4]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-white/30 backdrop-blur-sm z-10"
                      />
                      <button
                        type="button"
                        onClick={useCallback(() => setShowPwd(s => !s), [])}
                        disabled={loading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#7FFFD4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 z-20"
                        aria-label={showPwd ? "Hide password" : "Show password"}
                      >
                        {showPwd ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 animate-slide-down">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm password field */}
                  <div className="group">
                    <label className="mb-2 block text-sm font-medium text-slate-300 group-focus-within:text-[#7FFFD4] transition-colors duration-200">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4] z-10 group-focus-within:scale-110 transition-transform duration-200" />
                      <input
                        type={showPwd2 ? "text" : "password"}
                        value={form.confirm}
                        onChange={useCallback((e) => {
                          setForm(prev => ({ ...prev, confirm: e.target.value }));
                          if (errors.confirm) setErrors(prev => ({ ...prev, confirm: "" }));
                        }, [errors.confirm])}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        disabled={loading}
                        className="relative w-full rounded-xl border border-white/20 bg-white/5 px-10 py-3 pr-12 text-slate-100 placeholder-slate-500/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/60 focus:border-[#7FFFD4]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-white/30 backdrop-blur-sm z-10"
                      />
                      <button
                        type="button"
                        onClick={useCallback(() => setShowPwd2(s => !s), [])}
                        disabled={loading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#7FFFD4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 z-20"
                        aria-label={showPwd2 ? "Hide password" : "Show password"}
                      >
                        {showPwd2 ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirm && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 animate-slide-down">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.confirm}
                      </p>
                    )}
                  </div>

                  {/* Enhanced terms and conditions checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={form.terms}
                        onChange={useCallback((e) => {
                          setForm(prev => ({ ...prev, terms: e.target.checked }));
                          if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
                        }, [errors.terms])}
                        disabled={loading}
                        className="h-4 w-4 rounded border-2 border-white/20 bg-white/10 text-[#7FFFD4] focus:ring-2 focus:ring-[#7FFFD4]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-[#7FFFD4]/40"
                      />
                      {form.terms && (
                        <svg className="absolute inset-0 w-4 h-4 text-[#7FFFD4] pointer-events-none animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-xs text-slate-400/90 leading-relaxed">
                      I agree to the{" "}
                      <a href="/terms" className="text-[#7FFFD4] hover:text-cyan-400 hover:underline transition-colors duration-200">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-[#7FFFD4] hover:text-cyan-400 hover:underline transition-colors duration-200">
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 animate-slide-down">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.terms}
                    </p>
                  )}

                  {/* Enhanced error display */}
                  {apiError && (
                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3 animate-slide-down backdrop-blur-sm">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Registration Failed</p>
                        <p className="text-rose-300/80 text-xs mt-1">{apiError}</p>
                      </div>
                    </div>
                  )}

                  {/* Enhanced submit button */}
                  <button
                    type="submit"
                    disabled={loading || !form.terms}
                    className="mt-5 w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#7FFFD4]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="relative rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 px-6 py-3 font-bold text-slate-900 transition-all duration-300 group-hover:from-emerald-400 group-hover:via-cyan-400 group-hover:to-fuchsia-400">
                      <div className="flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <FiLoader className="animate-spin w-4 h-4" />
                            <span className="text-sm">Creating account...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm">Create Account</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Enhanced footer */}
                  <div className="mt-5 text-center">
                    <p className="text-slate-400/90 text-xs">
                      Already part of the community?{" "}
                      <a 
                        href="/login" 
                        className="text-[#7FFFD4] hover:text-cyan-400 font-semibold hover:underline transition-all duration-200 hover:scale-105 inline-block"
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;