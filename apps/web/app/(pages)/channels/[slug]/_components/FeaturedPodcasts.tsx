'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Headphones, CalendarDays, Star } from 'lucide-react';
import Link from 'next/link';
import type { ChannelPodcast } from '../_data/channelData';

interface FeaturedPodcastsProps {
  podcasts: ChannelPodcast[];
}

export function FeaturedPodcasts({ podcasts }: FeaturedPodcastsProps) {
  const featured = podcasts.filter(p => p.featured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-cyan-400" />
          <h2 className="text-2xl md:text-3xl font-secondary font-bold text-white tracking-wide">
            Featured Podcasts
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-white/30 font-sans text-sm">{featured.length} picks</span>
      </motion.div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {featured.map((podcast, i) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <FeaturedCard podcast={podcast} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Card ─────────────────────────────────────────────
function FeaturedCard({ podcast }: { podcast: ChannelPodcast }) {
  return (
    <Link
      href={`/podcast/${podcast.slug}`}
      id={`featured-podcast-${podcast.id}`}
      className="group block relative rounded-2xl overflow-hidden border border-white/8 hover:border-cyan-500/30 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)] focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(4px)' }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.75)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_24px_rgba(255,255,255,0.2)]">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-sans font-bold px-2.5 py-1 rounded-lg">
          <Clock className="w-3 h-3 text-white/60" />
          {podcast.duration}
        </div>

        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {podcast.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-[10px] font-sans font-bold text-cyan-400 bg-cyan-500/15 backdrop-blur-sm border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="text-white font-sans font-semibold text-base md:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
          {podcast.title}
        </h3>
        <p className="text-white/40 font-sans text-sm leading-relaxed line-clamp-2 mb-4">
          {podcast.summary}
        </p>

        {/* Footer meta */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-white/35 font-sans font-medium">
            <span className="flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5" />
              {podcast.listens}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {podcast.publishDate}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-sans font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Listen →
          </div>
        </div>
      </div>

      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(6,182,212,0.25)' }}
      />
    </Link>
  );
}
