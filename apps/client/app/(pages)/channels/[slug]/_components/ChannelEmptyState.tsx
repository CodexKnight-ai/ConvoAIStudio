"use client";

import { motion } from "framer-motion";
import { Sparkles, Mic } from "lucide-react";
import Link from "next/link";

export function ChannelEmptyState() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center max-w-md gap-6"
      >
        {/* AI-themed illustration */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsing rings */}
          <div
            className="absolute inset-0 rounded-full border border-cyan-500/10 animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute inset-4 rounded-full border border-purple-500/10 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          />
          {/* Core */}
          <div className="relative w-20 h-20 rounded-full liquid-glass-strong flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)]">
            <Mic className="w-8 h-8 text-white/30" />
          </div>
          {/* Orbiting sparkle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2">
              <Sparkles className="w-4 h-4 text-cyan-400/60" />
            </div>
          </motion.div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-secondary font-bold text-white">
            No podcasts yet
          </h3>
          <p className="text-white/40 font-sans text-base leading-relaxed">
            This channel hasn&apos;t published any podcasts yet. Check back soon
            — great content is on the way.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-white/25 font-sans text-xs uppercase tracking-widest">
            Are you the creator?
          </p>
          <Link
            href="/studio"
            id="empty-state-create-cta"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 font-sans font-semibold text-sm transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Start Creating with AI
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
