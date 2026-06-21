'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, Clock, Calendar, Moon, Play, Bell,
  Headphones, Users, Tag, Flame
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────
const LIVE_PODCASTS = [
  {
    id: 'live-1',
    title: 'The Future of AGI: Live Panel Discussion',
    channel: 'Lex Fridman',
    description: 'A live roundtable with leading AI researchers discussing the latest breakthroughs in artificial general intelligence and alignment.',
    category: 'AI',
    duration: '2:45 live',
    listeners: '12.4K',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    isLive: true,
  },
  {
    id: 'live-2',
    title: 'Startup Pitch Wars — Season 3',
    channel: 'Y Combinator',
    description: 'Founders pitch their startups live. The audience votes. Real-time feedback from top VCs and angel investors.',
    category: 'Startups',
    duration: '1:30 live',
    listeners: '8.7K',
    image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=800&auto=format&fit=crop',
    isLive: true,
  },
  {
    id: 'live-3',
    title: 'Neural Interfaces & Brain-Computer Tech',
    channel: 'Huberman Lab',
    description: 'Dr. Huberman explores the cutting edge of neural interfaces with a panel of neuroscientists and engineers from Neuralink.',
    category: 'Science',
    duration: '0:55 live',
    listeners: '5.2K',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    isLive: true,
  },
];

const UPCOMING_PODCASTS = [
  {
    id: 'upcoming-1',
    title: 'Quantum Computing Deep Dive',
    channel: 'Tech Visionaries',
    description: 'An upcoming exploration into quantum supremacy, error correction, and the future of quantum-native algorithms.',
    category: 'Technology',
    scheduledTime: '3:00 PM',
    duration: '1:30:00',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    isLive: false,
  },
  {
    id: 'upcoming-2',
    title: 'The Psychology of Peak Performance',
    channel: 'Andrew Huberman',
    description: 'Understanding dopamine cycles, focus protocols, and the neuroscience behind optimal human performance.',
    category: 'Science',
    scheduledTime: '5:30 PM',
    duration: '2:00:00',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    isLive: false,
  },
  {
    id: 'upcoming-3',
    title: 'Web3 & Decentralized Finance Explained',
    channel: 'My First Million',
    description: 'A beginner-friendly breakdown of Web3, DeFi, and how the next generation of financial infrastructure is being built.',
    category: 'Finance',
    scheduledTime: '7:00 PM',
    duration: '1:15:00',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    isLive: false,
  },
  {
    id: 'upcoming-4',
    title: 'Creative AI: Art, Music & Beyond',
    channel: 'MKBHD',
    description: 'Exploring how generative AI is transforming creative industries — from text-to-video models to AI music composition.',
    category: 'Entertainment',
    scheduledTime: '9:00 PM',
    duration: '1:45:00',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop',
    isLive: false,
  },
];

type TabKey = 'all' | 'live' | 'scheduled_today';

const TABS: { key: TabKey; label: string; icon: typeof Radio }[] = [
  { key: 'all', label: 'All', icon: Flame },
  { key: 'live', label: 'Live Now', icon: Radio },
  { key: 'scheduled_today', label: 'Scheduled Today', icon: Calendar},
];

// ─── Component ───────────────────────────────────────────────
export function ActivityHub() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [reminders, setReminders] = useState<Set<string>>(new Set());

  const toggleReminder = (id: string) => {
    setReminders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter logic
  const liveToShow = activeTab === 'all' || activeTab === 'live' ? LIVE_PODCASTS : [];
  const upcomingToShow = activeTab === 'all' || activeTab === 'scheduled_today' ? UPCOMING_PODCASTS : [];
  const showEmpty = activeTab === 'live' && liveToShow.length === 0 || (activeTab === 'scheduled_today' && upcomingToShow.length === 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-secondary font-bold text-white tracking-wide mb-2">
          Channel Activity Hub
        </h2>
        <p className="text-white/50 font-sans text-sm md:text-base">
          Track what&apos;s happening across the channels you follow.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-1.5 liquid-glass rounded-full px-2 py-1.5 mb-10 w-fit overflow-x-auto"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-[0_0_12px_rgba(8,145,178,0.4)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-10"
          >
            {/* Live Section */}
            {liveToShow.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-lg font-secondary font-bold text-white tracking-wide">Live Now</h3>
                  <span className="text-white/40 font-sans text-sm">({liveToShow.length})</span>
                </div>
                <div className="flex flex-col gap-5">
                  {liveToShow.map((podcast, i) => (
                    <motion.div
                      key={podcast.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <LiveCard podcast={podcast} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Section */}
            {upcomingToShow.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-secondary font-bold text-white tracking-wide">Upcoming Today</h3>
                  <span className="text-white/40 font-sans text-sm">({upcomingToShow.length})</span>
                </div>
                <div className="flex flex-col gap-5">
                  {upcomingToShow.map((podcast, i) => (
                    <motion.div
                      key={podcast.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 + 0.1 }}
                    >
                      <UpcomingCard
                        podcast={podcast}
                        hasReminder={reminders.has(podcast.id)}
                        onToggleReminder={() => toggleReminder(podcast.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Edge case: tab is 'live' but no live podcasts */}
            {activeTab === 'live' && liveToShow.length === 0 && (
              <EmptyState message="No channels are currently live." />
            )}
            {/* {activeTab === 'scheduled_today' && upcomingToShow.length === 0 && (
              <EmptyState message="No upcoming podcasts scheduled today." />
            )} */}

          </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Live Card ───────────────────────────────────────────────
function LiveCard({ podcast }: { podcast: typeof LIVE_PODCASTS[0] }) {
  return (
    <div className="liquid-glass-strong rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(8,145,178,0.15)] flex flex-col md:flex-row overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

        {/* LIVE badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold font-sans px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-secondary font-bold text-cyan-400 uppercase tracking-widest">{podcast.category}</span>
          </div>
          <h4 className="text-white font-sans font-semibold text-lg md:text-xl leading-tight mb-2 group-hover:text-white/90 transition">
            {podcast.title}
          </h4>
          <p className="text-cyan-400/80 font-sans text-sm font-medium mb-2">{podcast.channel}</p>
          <p className="text-white/40 font-sans text-sm line-clamp-2 leading-relaxed mb-4">
            {podcast.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-white/50 font-sans font-medium">
            <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
              <Headphones className="w-3.5 h-3.5" /> {podcast.listeners} listening
            </div>
            <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" /> {podcast.duration}
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold font-sans px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] cursor-pointer">
            <Play className="w-4 h-4" fill="currentColor" />
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Upcoming Card ───────────────────────────────────────────
function UpcomingCard({
  podcast,
  hasReminder,
  onToggleReminder,
}: {
  podcast: typeof UPCOMING_PODCASTS[0];
  hasReminder: boolean;
  onToggleReminder: () => void;
}) {
  return (
    <div className="liquid-glass-strong rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(8,145,178,0.15)] flex flex-col md:flex-row overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

        {/* Scheduled badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-bold font-sans px-3 py-1.5 rounded-full">
          <Calendar className="w-3 h-3" />
          Scheduled
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-secondary font-bold text-cyan-400 uppercase tracking-widest">{podcast.category}</span>
          </div>
          <h4 className="text-white font-sans font-semibold text-lg md:text-xl leading-tight mb-2 group-hover:text-white/90 transition">
            {podcast.title}
          </h4>
          <p className="text-cyan-400/80 font-sans text-sm font-medium mb-2">{podcast.channel}</p>
          <p className="text-white/40 font-sans text-sm line-clamp-2 leading-relaxed mb-4">
            {podcast.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-white/50 font-sans font-medium">
            <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" /> {podcast.scheduledTime}
            </div>
            <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
              <Tag className="w-3.5 h-3.5" /> {podcast.duration}
            </div>
          </div>
          <button
            onClick={onToggleReminder}
            className={`text-sm font-bold font-sans px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer border ${
              hasReminder
                ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-400 hover:bg-cyan-600/30'
                : 'bg-transparent border-white/20 text-white/80 hover:border-white/40 hover:text-white'
            }`}
          >
            <Bell className={`w-4 h-4 ${hasReminder ? 'fill-cyan-400' : ''}`} />
            {hasReminder ? 'Reminder Set' : 'Set Reminder'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────
function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="liquid-glass rounded-3xl p-12 flex flex-col items-center justify-center text-center"
    >
      <div className="liquid-glass-strong rounded-full p-5 mb-5">
        <Moon className="w-8 h-8 text-white/30" />
      </div>
      <p className="text-white/40 font-sans text-base max-w-md">{message}</p>
    </motion.div>
  );
}
