import React from "react";
import Navbar from "./Navbar";

const plans = [
  {
    name: "Free",
    price: "Free",
    benefits: [
      "Daily 3 posts",
      "10 likes/unlikes per day",
      "10 comments per day",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "100৳/month",
    benefits: [
      "Daily 20 posts",
      "100 likes/unlikes per day",
      "100 comments per day",
    ],
    highlight: true,
  },
  {
    name: "Unlimited",
    price: "500৳/month",
    benefits: [
      "Unlimited posts",
      "Unlimited likes/unlikes",
      "Unlimited comments",
    ],
    highlight: false,
  },
];

export default function Subscription() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 shadow-lg p-6 flex flex-col items-center ${
                plan.highlight ? "ring-2 ring-emerald-400" : ""
              }`}
            >
              <h2 className="text-xl font-semibold mb-2 text-[#7FFFD4]">
                {plan.name}
              </h2>
              <div className="text-2xl font-bold mb-4 text-cyan-300">{plan.price}</div>
              <ul className="mb-6 space-y-2">
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`px-6 py-2 rounded-lg font-semibold transition-all bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 hover:from-emerald-400 hover:to-cyan-400 ${
                  plan.highlight ? "shadow-lg" : ""
                }`}
              >
                {plan.price === "Free" ? "Current Plan" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
