// src/Components/Register.jsx
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiLoader } from "react-icons/fi";
import { authAPI } from "../utils/api";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setApiError("");
    
    const result = await authAPI.register(form);
    console.log('Register API result:', result);
    if (result.success) {
      setSubmitted(true);
    } else {
      setApiError(result.error);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 fakebook-grid">
        <div/>
        <div className="container mx-auto px-6 py-24 flex min-h-screen items-center justify-center">
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 fakebook-grid">
      <div/>
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_60px_rgba(127,255,212,0.15)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-slate-300/90">
                  Create account
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-cyan-200 to-fuchsia-300">
                  Join Fakebook
                </h2>
                <p className="mt-2 text-slate-300/90">Start sharing your photos and videos in style.</p>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Full name</label>
                  <div className="relative">
                    <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4]" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter Your Name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-slate-100 placeholder-slate-400/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/50"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Email</label>
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4]" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Enter Your Email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-slate-100 placeholder-slate-400/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/50"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Password</label>
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4]" />
                    <input
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-slate-100 placeholder-slate-400/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300/80 hover:text-[#7FFFD4]"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-rose-400">{errors.password}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Confirm password</label>
                  <div className="relative">
                    <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7FFFD4]" />
                    <input
                      type={showPwd2 ? "text" : "password"}
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-slate-100 placeholder-slate-400/70 outline-none focus:ring-2 focus:ring-[#7FFFD4]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd2((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300/80 hover:text-[#7FFFD4]"
                      aria-label={showPwd2 ? "Hide password" : "Show password"}
                    >
                      {showPwd2 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirm && <p className="mt-1 text-sm text-rose-400">{errors.confirm}</p>}
                </div>

                {apiError && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500/90 via-cyan-500/90 to-fuchsia-500/90 px-6 py-3.5 font-semibold text-slate-900 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>

                <p className="text-center text-sm text-slate-400/80">
                  By continuing you agree to our Terms & Privacy.
                </p>

                <p className="text-center text-sm text-slate-300/90">
                  Already have an account?{" "}
                  <a href="/login" className="text-[#7FFFD4] hover:underline">
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;