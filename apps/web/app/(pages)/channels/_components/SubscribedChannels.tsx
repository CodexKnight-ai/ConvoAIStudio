'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, CheckCircle2, Users, Mic,
  Eye, UserMinus, X, AlertTriangle
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────
const CHANNELS = [
  {
    id: 'ch-1', name: 'Lex Fridman', verified: true,
    category: 'AI & Technology', followers: '4.2M', podcasts: 420,
    description: 'Deep conversations about intelligence, science, and the nature of the universe.',
    image: 'https://i.pravatar.cc/150?img=11',
    lastActive: '2 hours ago',
  },
  {
    id: 'ch-2', name: 'Andrew Huberman', verified: true,
    category: 'Science & Health', followers: '3.8M', podcasts: 290,
    description: 'Neuroscience-based tools for everyday life. Protocols for sleep, focus, and performance.',
    image: 'https://i.pravatar.cc/150?img=12',
    lastActive: '5 hours ago',
  },
  {
    id: 'ch-3', name: 'Y Combinator', verified: true,
    category: 'Startups', followers: '2.1M', podcasts: 185,
    description: 'Startup lessons from the world\'s top accelerator. Founder stories, AMAs, and deep dives.',
    image: 'https://i.pravatar.cc/150?img=13',
    lastActive: '1 day ago',
  },
  {
    id: 'ch-4', name: 'MKBHD', verified: true,
    category: 'Technology', followers: '5.6M', podcasts: 340,
    description: 'Quality tech reviews, discussions, and behind-the-scenes looks at the latest in consumer tech.',
    image: 'https://i.pravatar.cc/150?img=14',
    lastActive: '3 hours ago',
  },
  {
    id: 'ch-5', name: 'My First Million', verified: false,
    category: 'Business & Finance', followers: '1.5M', podcasts: 510,
    description: 'Brainstorming business ideas, dissecting trends, and interviewing millionaire entrepreneurs.',
    image: 'https://i.pravatar.cc/150?img=15',
    lastActive: '12 hours ago',
  },
  {
    id: 'ch-6', name: 'Tim Ferriss', verified: true,
    category: 'Lifestyle & Productivity', followers: '3.1M', podcasts: 720,
    description: 'Deconstructing world-class performers to extract tactics, tools, and routines you can use.',
    image: 'https://i.pravatar.cc/150?img=16',
    lastActive: '6 hours ago',
  },
  {
    id: 'ch-7', name: 'Chris Williamson', verified: true,
    category: 'Psychology', followers: '2.4M', podcasts: 380,
    description: 'Exploring modern masculinity, psychology, and the art of living a meaningful life.',
    image: 'https://i.pravatar.cc/150?img=17',
    lastActive: '1 hour ago',
  },
  {
    id: 'ch-8', name: 'Renee DiResta', verified: false,
    category: 'Media & Society', followers: '890K', podcasts: 95,
    description: 'Investigating disinformation, platform dynamics, and the intersection of tech and society.',
    image: 'https://i.pravatar.cc/150?img=18',
    lastActive: '3 days ago',
  },
];

type SortKey = 'recent' | 'alpha' | 'followers' | 'newest';
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Most Recent Activity' },
  { key: 'alpha', label: 'Alphabetical' },
  { key: 'followers', label: 'Most Followed' },
  { key: 'newest', label: 'Newest Channels' },
];

// ─── Component ───────────────────────────────────────────────
export function SubscribedChannels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('recent');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [unsubTarget, setUnsubTarget] = useState<typeof CHANNELS[0] | null>(null);
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(
    new Set(CHANNELS.map(c => c.id))
  );
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleUnsubscribe = () => {
    if (!unsubTarget) return;
    setSubscribedIds(prev => {
      const next = new Set(prev);
      next.delete(unsubTarget.id);
      return next;
    });
    setUnsubTarget(null);
  };

  // Derived list
  const filteredChannels = useMemo(() => {
    let list = CHANNELS.filter(c => subscribedIds.has(c.id));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'alpha':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'followers':
        list = [...list].sort((a, b) => {
          const parse = (v: string) => parseFloat(v.replace(/[KM]/g, '')) * (v.includes('M') ? 1000 : 1);
          return parse(b.followers) - parse(a.followers);
        });
        break;
      case 'newest':
        list = [...list].reverse();
        break;
      default: // 'recent' — keep original order
        break;
    }

    return list;
  }, [searchQuery, sortBy, subscribedIds]);

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
          Subscribed Channels
        </h2>
        <p className="text-white/50 font-sans text-sm md:text-base">
          Manage the creators and communities you follow.
        </p>
      </motion.div>

      {/* Search + Sort Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search channels by name or category..."
            className="w-full liquid-glass-strong rounded-2xl pl-12 pr-4 py-3.5 text-sm font-sans text-white focus:outline-none placeholder:text-white/30 transition-all focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-64" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full liquid-glass hover:bg-white/[0.03] rounded-2xl px-4 py-3.5 flex items-center justify-between text-sm font-sans text-white/80 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.find(o => o.key === sortBy)?.label}
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-full bg-black/95 rounded-2xl shadow-2xl overflow-hidden z-30"
              >
                {SORT_OPTIONS.map(option => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSortBy(option.key);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors cursor-pointer ${
                      sortBy === option.key
                        ? 'text-cyan-400 bg-white/5'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Channel List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {filteredChannels.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="liquid-glass rounded-3xl p-12 flex flex-col items-center justify-center text-center"
            >
              <Search className="w-8 h-8 text-white/20 mb-4" />
              <p className="text-white/40 font-sans text-base">No channels match your search.</p>
            </motion.div>
          ) : (
            filteredChannels.map((channel, i) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <ChannelRow
                  channel={channel}
                  onUnsubscribe={() => setUnsubTarget(channel)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Unsubscribe Modal */}
      <AnimatePresence>
        {unsubTarget && (
          <UnsubscribeModal
            channel={unsubTarget}
            onCancel={() => setUnsubTarget(null)}
            onConfirm={handleUnsubscribe}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Channel Row ─────────────────────────────────────────────
function ChannelRow({
  channel,
  onUnsubscribe,
}: {
  channel: typeof CHANNELS[0];
  onUnsubscribe: () => void;
}) {
  return (
    <div className="liquid-glass-strong rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(8,145,178,0.1)] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 group">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-cyan-500/20 transition-all flex-shrink-0">
          <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="text-white font-sans font-semibold text-base truncate">{channel.name}</h4>
            {channel.verified && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40 font-sans font-medium flex-wrap">
            <span className="text-cyan-400/70">{channel.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {channel.followers}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1"><Mic className="w-3 h-3" /> {channel.podcasts} episodes</span>
          </div>
        </div>
      </div>

      {/* Center: Description */}
      <p className="text-white/40 font-sans text-sm flex-1 line-clamp-2 leading-relaxed md:px-4">
        {channel.description}
      </p>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
        <button className="flex-1 md:flex-none bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-400 text-sm font-sans font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(8,145,178,0.2)]">
          <Eye className="w-4 h-4" />
          View Channel
        </button>
        <button
          onClick={onUnsubscribe}
          className="flex-1 md:flex-none bg-transparent hover:bg-red-600/10 border border-white/10 hover:border-red-500/40 text-white/60 hover:text-red-400 text-sm font-sans font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <UserMinus className="w-4 h-4" />
          Unsubscribe
        </button>
      </div>
    </div>
  );
}

// ─── Unsubscribe Modal ───────────────────────────────────────
function UnsubscribeModal({
  channel,
  onCancel,
  onConfirm,
}: {
  channel: typeof CHANNELS[0];
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
      >
        <div className="liquid-glass-strong rounded-3xl border border-white/10 p-8 max-w-md w-full pointer-events-auto shadow-2xl">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-sans font-bold text-white text-center mb-3">
            Unsubscribe from {channel.name}?
          </h3>

          {/* Description */}
          <p className="text-white/40 font-sans text-sm text-center leading-relaxed mb-8">
            You will stop receiving updates, reminders, and recommendations from this channel.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-transparent border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm font-sans font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-sans font-bold px-4 py-3 rounded-xl transition-all cursor-pointer hover:shadow-[0_0_16px_rgba(239,68,68,0.3)]"
            >
              Confirm Unsubscribe
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
