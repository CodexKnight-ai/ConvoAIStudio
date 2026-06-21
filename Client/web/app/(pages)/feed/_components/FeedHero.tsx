'use client';

import { motion } from 'framer-motion';
import { Rss, Sparkles, Radio } from 'lucide-react';

export function FeedHero() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[12%] w-2 h-2 rounded-full bg-cyan-500/30 animate-pulse" />
        <div className="absolute top-[22%] right-[18%] w-1.5 h-1.5 rounded-full bg-purple-500/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[25%] w-1 h-1 rounded-full bg-blue-400/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[45%] right-[10%] w-2.5 h-2.5 rounded-full bg-cyan-400/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[35%] right-[30%] w-1.5 h-1.5 rounded-full bg-purple-400/25 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-cyan-900/10 blur-[100px]" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[200px] rounded-full bg-purple-900/8 blur-[80px]" />
      </div>

      {/* Icon cluster */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="liquid-glass rounded-full p-3">
          <Rss className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="liquid-glass rounded-full p-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div className="liquid-glass rounded-full p-3">
          <Radio className="w-5 h-5 text-blue-400" />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold font-primary text-center mb-6 tracking-wide text-white"
      >
        Explore AI Conversations
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white/50 font-sans text-lg md:text-xl text-center max-w-2xl italic leading-relaxed"
      >
        &ldquo;Discover trending discussions, live debates, and AI-generated podcast experiences from creators around the world.&rdquo;
      </motion.p>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex items-center gap-6 mt-10"
      >
        {[
          { label: 'Trending', value: '48' },
          { label: 'Live Now', value: '5' },
          { label: 'New Episodes', value: '124' },
        ].map((stat) => (
          <div key={stat.label} className="liquid-glass rounded-2xl px-5 py-3 flex flex-col items-center">
            <span className="text-white font-bold font-sans text-xl">{stat.value}</span>
            <span className="text-white/40 font-sans text-xs uppercase tracking-wider mt-0.5">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
