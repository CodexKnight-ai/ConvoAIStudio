"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Clock,
  Headphones,
  CalendarDays,
  Search,
  X,
  List,
} from "lucide-react";
import Link from "next/link";
import type { ChannelPodcast } from "../_data/channelData";

interface AllPodcastsProps {
  podcasts: ChannelPodcast[];
}

export function AllPodcasts({ podcasts }: AllPodcastsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    podcasts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).slice(0, 8);
  }, [podcasts]);

  // Filter
  const filtered = useMemo(() => {
    let list = [...podcasts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (activeTag) {
      list = list.filter((p) => p.tags.includes(activeTag));
    }
    return list;
  }, [podcasts, searchQuery, activeTag]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl md:text-3xl font-secondary font-bold text-white tracking-wide">
            All Podcasts
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-white/30 font-sans text-sm">
          {podcasts.length} episodes
        </span>
      </motion.div>

      {/* Search + Tag Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4 mb-8"
      >
        {/* Search bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search episodes by title or topic..."
            id="podcast-search-input"
            className="w-full liquid-glass rounded-xl pl-11 pr-10 py-3 text-sm font-sans text-white placeholder:text-white/30 focus:outline-none focus:shadow-[0_0_0_1.5px_rgba(6,182,212,0.4)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTag(null)}
              id="tag-filter-all"
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeTag === null
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-white/40 hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                id={`tag-filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTag === tag
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Podcast List */}
      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="liquid-glass rounded-2xl p-12 flex flex-col items-center justify-center text-center"
            >
              <Search className="w-8 h-8 text-white/20 mb-3" />
              <p className="text-white/40 font-sans text-base">
                No episodes match your search.
              </p>
            </motion.div>
          ) : (
            filtered.map((podcast, i) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                layout
              >
                <PodcastRow
                  podcast={podcast}
                  index={i}
                  isLast={i === filtered.length - 1}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Podcast Row ───────────────────────────────────────────────
function PodcastRow({
  podcast,
  index,
  isLast,
}: {
  podcast: ChannelPodcast;
  index: number;
  isLast: boolean;
}) {
  return (
    <>
      <Link
        href={`/podcast/${podcast.slug}`}
        id={`podcast-row-${podcast.id}`}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 px-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20"
      >
        {/* Left: Thumbnail */}
        <div className="relative flex-shrink-0 w-full sm:w-28 md:w-36 h-20 sm:h-20 rounded-xl overflow-hidden">
          <img
            src={podcast.thumbnail}
            alt={podcast.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "brightness(0.8)" }}
          />
          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-sans font-semibold text-base leading-snug mb-1.5 group-hover:text-cyan-200 transition-colors line-clamp-2">
            {podcast.title}
          </h3>
          <p className="text-white/40 font-sans text-sm leading-relaxed line-clamp-2 mb-2.5">
            {podcast.summary}
          </p>
          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {podcast.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-sans font-bold text-white/40 px-2 py-0.5 rounded-full group-hover:text-cyan-400/60 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 flex-shrink-0 text-xs font-sans text-white/35 sm:min-w-[100px]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold text-white/60">
              {podcast.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{podcast.publishDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5" />
            <span>{podcast.listens}</span>
          </div>
        </div>
      </Link>

      {/* Divider (not after last item) */}
      {!isLast && (
        <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent mx-3" />
      )}
    </>
  );
}
