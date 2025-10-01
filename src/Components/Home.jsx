// src/Components/Home.jsx
import { FiImage, FiVideo, FiHeart, FiMessageCircle, FiArrowRight, FiUsers, FiGlobe, FiBookOpen, FiShield, FiStar, FiCheck } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-cyan-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-28 h-28 border border-fuchsia-400/30 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 border border-emerald-400/30 rounded-full animate-pulse delay-500"></div>
        
        {/* Islamic geometric patterns */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 border-2 border-emerald-400/20 rotate-45 animate-spin-slow"></div>
        </div>
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <div className="w-20 h-20 border-2 border-cyan-400/20 rotate-45 animate-spin-slow delay-1000"></div>
        </div>
        
        {/* Crescent moon and star pattern */}
        <div className="absolute top-1/2 left-10 text-emerald-400/10 text-6xl animate-pulse">☪</div>
        <div className="absolute top-1/3 right-10 text-cyan-400/10 text-4xl animate-pulse delay-1000">★</div>
        <div className="absolute bottom-1/3 left-1/2 text-fuchsia-400/10 text-5xl animate-pulse delay-2000">☪</div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_60px_rgba(127,255,212,0.15)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/70 backdrop-blur-xl border border-white/10 px-8 py-12 md:px-12 md:py-16">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl animate-pulse">☪</div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm text-slate-300/90 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#7FFFD4] animate-pulse" />
                    Assalamu Alaikum - Welcome to UmmahConnect
                  </span>
                  <div className="text-4xl animate-pulse delay-500">★</div>
                </div>

                <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 animate-gradient-x">
                    Connect with the
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-emerald-300 animate-gradient-x">
                    Global Ummah
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg text-slate-300/90 leading-relaxed">
                  Join a blessed community where Muslims worldwide share meaningful content, 
                  connect through faith, and strengthen the bonds of brotherhood and sisterhood in Islam.
                  Share your journey, inspire others, and grow together in deen.
                </p>

                <div className="mt-8 text-center">
                  <p className="text-emerald-400 font-arabic text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
                  <p className="text-slate-400 text-sm italic">"In the name of Allah, the Most Gracious, the Most Merciful"</p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[#7FFFD4]">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md hover:bg-white/10 transition-all group">
                    <FiImage className="animate-[float_6s_ease-in-out_infinite] group-hover:scale-110 transition-transform" /> 
                    <span className="font-medium">Halal Content</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md hover:bg-white/10 transition-all group">
                    <FiUsers className="animate-[float_7s_ease-in-out_infinite] group-hover:scale-110 transition-transform" /> 
                    <span className="font-medium">Ummah Network</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md hover:bg-white/10 transition-all group">
                    <FiBookOpen className="animate-[float_5.5s_ease-in-out_infinite] group-hover:scale-110 transition-transform" /> 
                    <span className="font-medium">Islamic Learning</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md hover:bg-white/10 transition-all group">
                    <FiShield className="animate-[float_8s_ease-in-out_infinite] group-hover:scale-110 transition-transform" /> 
                    <span className="font-medium">Safe Space</span>
                  </span>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
                  {isAuthenticated ? (
                    <a
                      href="/dashboard"
                      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 px-8 py-4 font-bold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transform hover:scale-105"
                    >
                      <span className="text-lg">Enter Dashboard</span>
                      <FiArrowRight className="transition-transform group-hover:translate-x-2 w-5 h-5" />
                    </a>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 px-8 py-4 font-bold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transform hover:scale-105"
                      >
                        <span className="text-lg">Join the Ummah</span>
                        <FiArrowRight className="transition-transform group-hover:translate-x-2 w-5 h-5" />
                      </a>
                      <a
                        href="/feed"
                        className="group inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/5 px-8 py-4 font-bold text-slate-100 hover:bg-white/10 hover:border-[#7FFFD4]/50 transition-all backdrop-blur-md transform hover:scale-105"
                      >
                        <span className="text-lg">Explore Content</span>
                        <FiGlobe className="transition-transform group-hover:rotate-12 w-5 h-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* What is UmmahConnect Section */}
      <section className="relative z-10 py-20 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-8">
              What is UmmahConnect?
            </h2>
            <p className="text-lg text-slate-300/90 leading-relaxed mb-12">
              UmmahConnect is a blessed platform designed exclusively for the Muslim community worldwide. 
              It's a safe, halal space where believers can share meaningful content, connect with fellow Muslims, 
              learn about Islam, and strengthen their faith together. Our platform ensures all content aligns 
              with Islamic values while fostering genuine connections within the Ummah.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-4">
                Platform Features
              </h2>
              <p className="text-slate-400 text-lg">Discover what makes UmmahConnect special for Muslims worldwide</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiShield className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Halal Content Only</h3>
                <p className="text-slate-300/80">All content is moderated to ensure it aligns with Islamic values and principles.</p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiUsers className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Global Ummah Network</h3>
                <p className="text-slate-300/80">Connect with Muslims from every corner of the world and build lasting friendships.</p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiBookOpen className="w-6 h-6 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Islamic Learning</h3>
                <p className="text-slate-300/80">Share and discover Islamic knowledge, Quran verses, and educational content.</p>
              </div>

              {/* Feature 4 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiImage className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Share Moments</h3>
                <p className="text-slate-300/80">Share your halal photos, Islamic calligraphy, nature shots, and meaningful moments.</p>
              </div>

              {/* Feature 5 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiHeart className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Positive Interactions</h3>
                <p className="text-slate-300/80">Engage with content through likes, respectful comments, and meaningful discussions.</p>
              </div>

              {/* Feature 6 */}
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiGlobe className="w-6 h-6 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Worldwide Community</h3>
                <p className="text-slate-300/80">Join Muslims from different countries, cultures, and backgrounds in one unified platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose UmmahConnect Section */}
      <section className="relative z-10 py-20 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-4">
                Why Choose UmmahConnect?
              </h2>
              <p className="text-slate-400 text-lg">Built by Muslims, for Muslims - with Islamic values at its core</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Islamic Values First</h3>
                    <p className="text-slate-300/80">Every feature and policy is designed with Islamic principles in mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Safe & Moderated Environment</h3>
                    <p className="text-slate-300/80">Strict content moderation ensures a clean, family-friendly experience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Privacy Protection</h3>
                    <p className="text-slate-300/80">Your data and privacy are protected according to Islamic ethics.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Educational Content</h3>
                    <p className="text-slate-300/80">Learn about Islam, share knowledge, and grow in your faith journey.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Respectful Community</h3>
                    <p className="text-slate-300/80">Connect with like-minded Muslims who share your values and beliefs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Free to Use</h3>
                    <p className="text-slate-300/80">Join our community without any cost - spreading goodness is our mission.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40">
              <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/70 backdrop-blur-xl border border-white/10 px-8 py-12">
                <div className="text-4xl mb-6">☪ 🌟 ☪</div>
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-6">
                  Ready to Join the Ummah?
                </h2>
                <p className="text-lg text-slate-300/90 mb-8 max-w-2xl mx-auto">
                  Start your journey with us today. Connect with Muslims worldwide, share your experiences, 
                  and be part of a community that values faith, respect, and brotherhood.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/register"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 px-8 py-4 font-bold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-2xl shadow-emerald-500/30 transform hover:scale-105"
                  >
                    <span className="text-lg">Create Account</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-2 w-5 h-5" />
                  </a>
                  <p className="text-slate-400 text-sm">
                    Already have an account? <a href="/login" className="text-[#7FFFD4] hover:underline font-semibold">Sign in here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950/80 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">☪</div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    UmmahConnect
                  </h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Connecting the global Muslim community through faith, respect, and shared values. 
                  A blessed platform for the Ummah worldwide.
                </p>
                <div className="text-emerald-400 text-sm mb-2">جزاك الله خيراً</div>
                <p className="text-slate-500 text-xs italic">"May Allah reward you with good"</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded"></span>
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/feed" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Explore Feed
                    </a>
                  </li>
                  <li>
                    <a href="/community-guidelines" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="/islamic-values" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Our Islamic Values
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support & Help */}
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-fuchsia-400 rounded"></span>
                  Support & Help
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/help" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/report" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Report Content
                    </a>
                  </li>
                  <li>
                    <a href="/feedback" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Send Feedback
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal & Privacy */}
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-fuchsia-400 to-emerald-400 rounded"></span>
                  Legal & Privacy
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy-policy" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms-of-service" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/cookie-policy" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="/data-protection" className="text-slate-400 hover:text-[#7FFFD4] text-sm transition-colors hover:underline">
                      Data Protection
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Islamic Quote Section */}
            <div className="border-t border-white/10 pt-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                  <div className="text-2xl">🌟</div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                </div>
                <blockquote className="text-emerald-300 text-lg font-medium mb-2 max-w-2xl mx-auto">
                  "The believers in their mutual kindness, compassion, and sympathy are just one body. 
                  If a limb suffers, the whole body responds to it with wakefulness and fever."
                </blockquote>
                <cite className="text-slate-400 text-sm">- Prophet Muhammad ﷺ (Hadith: Bukhari & Muslim)</cite>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">©</span>
                    <span>2025 UmmahConnect.</span>
                    <span>All rights reserved.</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-xs">Made with</span>
                  <div className="text-rose-400 animate-pulse">❤️</div>
                  <span className="text-slate-500 text-xs">for the Ummah</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Halal & Safe</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <FiShield className="w-4 h-4 text-cyan-400" />
                    <span>Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Islamic Blessing */}
            <div className="text-center mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-xl">☪</span>
                <p className="text-slate-400 text-sm">
                  بارك الله فيكم - May Allah bless you all
                </p>
                <span className="text-xl">☪</span>
              </div>
              <p className="text-slate-500 text-xs">
                "And whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;