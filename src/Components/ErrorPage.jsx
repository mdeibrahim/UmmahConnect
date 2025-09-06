// src/Components/ErrorPage.jsx
import React from 'react';

const ErrorPage = ({
    title = "Something went wrong",
    message = "An unexpected error occurred. Please try again.",
    actionText = "Go Home",
    actionHref = "/",
    icon = null,
    children
}) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 fakebook-grid">
            <div />
            <div className="container mx-auto px-6 py-24 flex min-h-screen items-center justify-center">
                <div className="max-w-lg w-full rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-fuchsia-500/40 shadow-[0_0_60px_rgba(127,255,212,0.15)]">
                    <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-10 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-[#7FFFD4] text-3xl">
                            {icon ? icon : <span>!</span>}
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-cyan-200 to-fuchsia-300">
                            {title}
                        </h2>
                        <p className="mt-3 text-slate-300/90">
                            {message}
                        </p>
                        {children}
                        {actionText && (
                            <a
                                href={actionHref}
                                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500/90 via-cyan-500/90 to-fuchsia-500/90 px-6 py-3 font-semibold text-slate-900 hover:from-emerald-400 hover:via-cyan-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-emerald-500/20"
                            >
                                {actionText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;