'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Users, Mic, CalendarDays, Bell, BellOff, Share2, Sparkles
} from 'lucide-react';
import type { ChannelData } from '../_data/channelData';

interface ChannelHeroBannerProps {
  channel: ChannelData;
}

export function ChannelHeroBanner({ channel }: ChannelHeroBannerProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(prev => !prev);
    if (!subscribed) setNotifications(false);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '420px' }}>
      {/* ── Banner Background ─────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src={channel.bannerImage}
          alt={`${channel.name} banner`}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(1.2)' }}
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
        {/* Subtle cyan tint glow at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>

      {/* ── Decorative ambient blobs ─────────────────────── */}
      <div className="absolute top-8 left-[15%] w-64 h-64 rounded-full bg-cyan-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-80 h-48 rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-16 md:pt-20 flex flex-col items-start gap-6">

        {/* AI Category badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm text-cyan-400 text-xs font-sans font-bold px-3 py-1.5 rounded-full tracking-widest uppercase"
        >
          <Sparkles className="w-3 h-3" />
          {channel.category}
        </motion.div>

        {/* Avatar + Identity row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-2 ring-white/15 shadow-2xl">
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            </div>
            {channel.verified && (
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            )}
          </div>

          {/* Name + description */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-primary font-bold text-white tracking-wide leading-tight">
                {channel.name}
              </h1>
            </div>
            <p className="text-white/55 font-sans text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2">
              {channel.description}
            </p>
          </div>
        </motion.div>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-4 md:gap-6"
        >
          <MetaStat icon={<Users className="w-4 h-4 text-cyan-400" />} value={channel.subscriberCount} label="Subscribers" />
          <span className="w-px h-5 bg-white/15 hidden sm:block" />
          <MetaStat icon={<Mic className="w-4 h-4 text-purple-400" />} value={channel.totalPodcasts.toString()} label="Podcasts" />
          <span className="w-px h-5 bg-white/15 hidden sm:block" />
          <MetaStat icon={<CalendarDays className="w-4 h-4 text-blue-400" />} value={channel.joinedDate} label="Joined" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Subscribe */}
          <button
            onClick={handleSubscribe}
            id="channel-subscribe-btn"
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm transition-all duration-300 cursor-pointer overflow-hidden group ${
              subscribed
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                : 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_32px_rgba(6,182,212,0.5)] hover:scale-[1.02]'
            }`}
          >
            {!subscribed && (
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            <span className="relative z-10">{subscribed ? 'Subscribed ✓' : 'Subscribe'}</span>
          </button>

          {/* Notifications (only when subscribed) */}
          {subscribed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setNotifications(prev => !prev)}
              id="channel-notifications-btn"
              title={notifications ? 'Turn off notifications' : 'Turn on notifications'}
              className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 cursor-pointer ${
                notifications
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                  : 'bg-white/5 border-white/15 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {notifications ? <Bell className="w-4 h-4 fill-cyan-400" /> : <BellOff className="w-4 h-4" />}
            </motion.button>
          )}

          {/* Share */}
          <button
            onClick={handleShare}
            id="channel-share-btn"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 text-sm font-sans font-semibold transition-all duration-300 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </motion.div>
      </div>

      {/* Bottom fade blend into page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Meta Stat Sub-component ───────────────────────────────────
function MetaStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-white font-sans font-bold text-sm">{value}</span>
      <span className="text-white/40 font-sans text-sm">{label}</span>
    </div>
  );
}
