'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getRelatedPodcasts, type RelatedPodcast } from '../../../feed/_data/feedData';

interface RelatedSidebarProps {
  currentSlug: string;
}

export function RelatedSidebar({ currentSlug }: RelatedSidebarProps) {
  const related = getRelatedPodcasts(currentSlug, 8);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-secondary font-bold text-white tracking-wide">
        Related Conversations
      </h3>

      <div className="flex flex-col gap-4">
        {related.map((item: RelatedPodcast, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/podcast/${item.slug}`} className="flex gap-3 group">
              {/* Thumbnail Container */}
              <div className="relative w-28 h-[64px] sm:w-32 sm:h-[72px] md:w-36 md:h-[80px] rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/5 group-hover:border-cyan-500/30 transition-all">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-sans font-medium text-white">
                  {item.duration}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-white text-xs sm:text-sm font-sans font-semibold line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h4>

                <span className="text-white/60 font-sans text-[11px] sm:text-xs mt-1 truncate">
                  {item.channelName}
                </span>

                <span className="text-white/40 font-sans text-[10px] sm:text-[11px] mt-0.5">
                  {item.views} views
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
